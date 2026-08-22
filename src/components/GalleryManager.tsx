"use client";

import { useState } from "react";
import Image from "next/image";

const CATEGORIES = ["Wedding", "Sangeet", "Mehendi", "Bachelorette", "Us"];

interface ImageItem {
  id: string;
  url: string;
  caption?: string | null;
  category: string;
  createdAt: string | Date;
}

export default function GalleryManager({ initialImages }: { initialImages: ImageItem[] }) {
  const [images, setImages] = useState<ImageItem[]>(initialImages);
  const [files, setFiles] = useState<FileList | null>(null);
  const [category, setCategory] = useState<string>("Wedding");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [error, setError] = useState("");

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
      formData.append("category", category);
      formData.append("caption", caption);

      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setImages([...data.images, ...images]);
      setFiles(null);
      setCaption("");
      const fileInput = document.getElementById("gallery-files-input") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload images");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete image");

      setImages(images.filter((img) => img.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete image");
    } finally {
      setDeletingId(null);
    }
  }

  const filteredImages = filterCategory === "All"
    ? images
    : images.filter((img) => img.category === filterCategory);

  return (
    <div className="mt-10 font-sans">
      <h2 className="text-xl sm:text-2xl text-[#8B6F4E] font-semibold mb-4 font-serif">
        📸 Manage Gallery Pictures
      </h2>

      {/* Upload Box */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 mb-8 shadow-sm border border-amber-100">
        <h3 className="text-sm sm:text-base font-semibold text-stone-800 mb-3">
          Upload Photos (Multiple Supported)
        </h3>

        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">
                Select Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm text-stone-800 outline-none focus:ring-2 focus:ring-[#8B6F4E]/20"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">
                Select Image Files
              </label>
              <input
                id="gallery-files-input"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                required
                className="w-full p-2 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-700 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:bg-amber-100 file:text-amber-800"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">
                Batch Caption (Optional)
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Sangeet dance night"
                className="w-full p-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 outline-none focus:ring-2 focus:ring-[#8B6F4E]/20"
              />
            </div>
          </div>

          {files && files.length > 0 && (
            <p className="text-xs text-[#8B6F4E] font-medium">
              📎 {files.length} {files.length === 1 ? "photo" : "photos"} selected for category &quot;{category}&quot;
            </p>
          )}

          {error && <p className="text-xs text-rose-500">{error}</p>}

          <button
            type="submit"
            disabled={uploading || !files || files.length === 0}
            className={`self-start px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all shadow-sm ${
              uploading || !files || files.length === 0
                ? "bg-amber-200 cursor-not-allowed"
                : "bg-[#8B6F4E] hover:bg-[#785e40]"
            }`}
          >
            {uploading ? `Uploading ${files?.length || 0} Photos...` : "Upload Selected Photos"}
          </button>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-sm sm:text-base font-semibold text-stone-800">
          Uploaded Photos ({filteredImages.length})
        </h3>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? "bg-[#8B6F4E] text-white shadow-sm"
                  : "bg-white text-stone-600 border border-stone-200 hover:bg-amber-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredImages.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-amber-100">
          <p className="text-xs sm:text-sm text-stone-400">
            No uploaded photos in {filterCategory === "All" ? "gallery" : `"${filterCategory}"`} category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-xl overflow-hidden border border-amber-100 shadow-sm flex flex-col justify-between"
            >
              <div className="relative w-full aspect-square bg-stone-100">
                <Image src={img.url} alt={img.caption || "Gallery photo"} fill className="object-cover" />
                <span className="absolute top-1.5 right-1.5 bg-black/60 text-white px-2 py-0.5 rounded-md text-[10px] font-semibold">
                  {img.category || "Us"}
                </span>
              </div>
              <div className="p-2.5 flex flex-col justify-between flex-grow">
                <p className="text-xs text-stone-700 line-clamp-1 mb-2">
                  {img.caption || <span className="text-stone-300 italic">No caption</span>}
                </p>
                <button
                  onClick={() => handleDelete(img.id)}
                  disabled={deletingId === img.id}
                  className="w-full py-1 px-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[11px] font-semibold transition-colors"
                >
                  {deletingId === img.id ? "Deleting..." : "Delete Photo"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
