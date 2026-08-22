"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fdf6f0 0%, #f5ede3 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Georgia, serif",
      padding: "1rem",
    }}>
      <div style={{
        background: "white",
        borderRadius: "1.5rem",
        padding: "3rem 2.5rem",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 8px 40px rgba(139,111,78,0.12)",
        border: "1px solid #f0e8dc",
        textAlign: "center",
      }}>
        {/* Logo Monogram */}
        <img
          src="/logo.png"
          alt="Rashmi & Aditya Monogram"
          style={{
            width: "80px",
            height: "80px",
            objectFit: "contain",
            margin: "0 auto 1rem",
          }}
        />

        <h1 style={{ fontSize: "1.75rem", color: "#8B6F4E", marginBottom: "0.5rem" }}>
          Admin Portal
        </h1>
        <p style={{ color: "#aaa", fontFamily: "sans-serif", fontSize: "0.9rem", marginBottom: "2rem" }}>
          Rashmi &amp; Aditya — RSVP Dashboard
        </p>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            autoFocus
            style={{
              width: "100%",
              padding: "0.9rem 1rem",
              borderRadius: "0.75rem",
              border: error ? "1.5px solid #e57373" : "1.5px solid #e8ddd4",
              fontSize: "1rem",
              fontFamily: "sans-serif",
              outline: "none",
              textAlign: "center",
              letterSpacing: "0.1em",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
          />

          {error && (
            <p style={{
              color: "#e57373",
              fontFamily: "sans-serif",
              fontSize: "0.85rem",
              margin: "0",
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              padding: "0.9rem",
              background: loading || !password ? "#d4b896" : "#8B6F4E",
              color: "white",
              border: "none",
              borderRadius: "0.75rem",
              fontSize: "1rem",
              fontFamily: "sans-serif",
              fontWeight: "600",
              cursor: loading || !password ? "not-allowed" : "pointer",
              transition: "background 0.2s",
              letterSpacing: "0.03em",
            }}
          >
            {loading ? "Verifying..." : "Enter Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
