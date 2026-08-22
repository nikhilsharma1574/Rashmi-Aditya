import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const whereClause = category && category !== "All" ? { category } : {};

    const images = await prisma.galleryImage.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error("Failed to fetch gallery images:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authCookie = req.cookies.get("admin_auth");
    if (!authCookie || authCookie.value !== "true") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const category = (formData.get("category") as string) || "Us";
    const caption = (formData.get("caption") as string) || "";

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No image files provided" }, { status: 400 });
    }

    const createdImages = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

      let imageUrl = "";

      try {
        // Upload directly to Supabase Cloud Bucket "gallery"
        const { data, error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(filename, buffer, {
            contentType: file.type || "image/jpeg",
            upsert: true,
          });

        if (uploadError) {
          console.error("Supabase Storage Error:", uploadError.message);
          throw new Error(`Cloud upload failed: ${uploadError.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from("gallery")
          .getPublicUrl(data.path);

        imageUrl = publicUrlData.publicUrl;
      } catch (storageErr) {
        console.error("Storage error fallback:", storageErr);
        // Fallback to local public/uploads directory if needed
        try {
          const uploadsDir = path.join(process.cwd(), "public", "uploads");
          await mkdir(uploadsDir, { recursive: true });
          const filePath = path.join(uploadsDir, filename);
          await writeFile(filePath, buffer);
          imageUrl = `/uploads/${filename}`;
        } catch (fileErr) {
          console.error("Local file save error:", fileErr);
          imageUrl = `https://rtrhiahpdxdryzqwirci.supabase.co/storage/v1/object/public/gallery/${filename}`;
        }
      }

      let newImage;
      try {
        newImage = await prisma.galleryImage.create({
          data: {
            url: imageUrl,
            caption: caption || file.name.split(".")[0],
            category,
          },
        });
      } catch (dbErr) {
        console.warn("Primary DB insert failed, retrying...", dbErr);
        newImage = await prisma.galleryImage.create({
          data: {
            url: imageUrl,
            caption: caption || file.name.split(".")[0],
            category,
          },
        });
      }

      createdImages.push(newImage);
    }

    return NextResponse.json({ success: true, images: createdImages });
  } catch (error: unknown) {
    console.error("Gallery Batch Upload Error:", error);
    const msg = error instanceof Error ? error.message : "Failed to upload images";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authCookie = req.cookies.get("admin_auth");
    if (!authCookie || authCookie.value !== "true") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Image ID required" }, { status: 400 });
    }

    const img = await prisma.galleryImage.findUnique({ where: { id } });
    if (img && img.url.includes("supabase.co") && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const parts = img.url.split("/gallery/");
      if (parts.length > 1) {
        await supabase.storage.from("gallery").remove([parts[1]]);
      }
    }

    await prisma.galleryImage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gallery Delete Error:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
