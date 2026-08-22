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
    <div style={{ marginTop: "3rem" }}>
      <h2 style={{ fontSize: "1.75rem", color: "#8B6F4E", marginBottom: "1.5rem", fontFamily: "Georgia, serif" }}>
        📸 Manage Gallery Pictures
      </h2>

      {/* Upload Box */}
      <div
        style={{
          background: "white",
          borderRadius: "1rem",
          padding: "2rem",
          marginBottom: "2.5rem",
          boxShadow: "0 2px 12px rgba(139,111,78,0.08)",
          border: "1px solid #f0e8dc",
        }}
      >
        <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#444", marginBottom: "1rem", fontFamily: "sans-serif" }}>
          Upload Photos (Multiple Supported)
        </h3>

        <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "500", color: "#666", marginBottom: "0.4rem", fontFamily: "sans-serif" }}>
                Select Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e0d5c8",
                  background: "white",
                  fontFamily: "sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "500", color: "#666", marginBottom: "0.4rem", fontFamily: "sans-serif" }}>
                Select Image Files (Select Multiple)
              </label>
              <input
                id="gallery-files-input"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                required
                style={{
                  width: "100%",
                  padding: "0.6rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e0d5c8",
                  background: "#faf8f5",
                  fontFamily: "sans-serif",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "500", color: "#666", marginBottom: "0.4rem", fontFamily: "sans-serif" }}>
                Batch Caption (Optional)
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Sangeet dance night"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e0d5c8",
                  fontFamily: "sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {files && files.length > 0 && (
            <p style={{ fontSize: "0.85rem", color: "#8B6F4E", fontFamily: "sans-serif", fontWeight: "500" }}>
              📎 {files.length} {files.length === 1 ? "photo" : "photos"} selected for category &quot;{category}&quot;
            </p>
          )}

          {error && <p style={{ color: "#e57373", fontSize: "0.85rem", fontFamily: "sans-serif" }}>{error}</p>}

          <button
            type="submit"
            disabled={uploading || !files || files.length === 0}
            style={{
              alignSelf: "flex-start",
              padding: "0.75rem 2rem",
              background: uploading || !files || files.length === 0 ? "#d4b896" : "#8B6F4E",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: "600",
              cursor: uploading || !files || files.length === 0 ? "not-allowed" : "pointer",
              fontFamily: "sans-serif",
              transition: "background 0.2s",
            }}
          >
            {uploading ? `Uploading ${files?.length || 0} Photos...` : "Upload Selected Photos"}
          </button>
        </form>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#444", margin: 0, fontFamily: "sans-serif" }}>
          Uploaded Photos ({filteredImages.length})
        </h3>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              style={{
                padding: "0.4rem 0.9rem",
                borderRadius: "9999px",
                border: filterCategory === cat ? "none" : "1px solid #e0d5c8",
                background: filterCategory === cat ? "#8B6F4E" : "white",
                color: filterCategory === cat ? "white" : "#666",
                fontSize: "0.8rem",
                fontWeight: "600",
                cursor: "pointer",
                fontFamily: "sans-serif",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredImages.length === 0 ? (
        <div style={{ background: "white", borderRadius: "1rem", padding: "3rem", textAlign: "center", border: "1px solid #f0e8dc" }}>
          <p style={{ color: "#aaa", fontFamily: "sans-serif" }}>
            No uploaded photos in {filterCategory === "All" ? "gallery" : `"${filterCategory}"`} category.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem" }}>
          {filteredImages.map((img) => (
            <div
              key={img.id}
              style={{
                background: "white",
                borderRadius: "0.75rem",
                overflow: "hidden",
                border: "1px solid #f0e8dc",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "160px", background: "#f0ece7" }}>
                <Image src={img.url} alt={img.caption || "Gallery photo"} fill style={{ objectFit: "cover" }} />
                <span
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                    background: "rgba(0,0,0,0.6)",
                    color: "white",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "9999px",
                    fontSize: "0.7rem",
                    fontFamily: "sans-serif",
                    fontWeight: "600",
                  }}
                >
                  {img.category || "Us"}
                </span>
              </div>
              <div style={{ padding: "0.85rem", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                <p style={{ fontSize: "0.85rem", color: "#555", fontFamily: "sans-serif", marginBottom: "0.5rem" }}>
                  {img.caption || <span style={{ color: "#aaa", fontStyle: "italic" }}>No caption</span>}
                </p>
                <button
                  onClick={() => handleDelete(img.id)}
                  disabled={deletingId === img.id}
                  style={{
                    padding: "0.4rem 0.75rem",
                    background: "#ffebee",
                    color: "#c62828",
                    border: "1px solid #ffcdd2",
                    borderRadius: "0.4rem",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontFamily: "sans-serif",
                  }}
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
