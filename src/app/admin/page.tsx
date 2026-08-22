import { prisma } from "@/lib/prisma";
import GalleryManager from "@/components/GalleryManager";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let rsvps: any[] = [];
  let galleryImages: any[] = [];

  try {
    rsvps = await prisma.rSVP.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.error("Failed to fetch RSVPs:", e);
  }

  try {
    galleryImages = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.error("Failed to fetch Gallery images:", e);
  }

  const attending = rsvps.filter((r) => r.attending);
  const declining = rsvps.filter((r) => !r.attending);
  const totalGuests = attending.reduce((sum, r) => sum + r.guests, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#faf8f5", padding: "2rem", fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <img
            src="/logo.png"
            alt="Rashmi & Aditya Monogram"
            style={{ width: "80px", height: "80px", objectFit: "contain", margin: "0 auto 1rem" }}
          />
          <h1 style={{ fontSize: "2.5rem", color: "#8B6F4E", marginBottom: "0.5rem" }}>
            👑 Admin Dashboard
          </h1>
          <p style={{ color: "#999", fontFamily: "sans-serif" }}>Rashmi &amp; Aditya — Wedding Portal</p>
        </div>

        <h2 style={{ fontSize: "1.75rem", color: "#8B6F4E", marginBottom: "1.25rem" }}>
          💌 RSVP Responses
        </h2>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", textAlign: "center", boxShadow: "0 2px 12px rgba(139,111,78,0.08)", border: "1px solid #f0e8dc" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#8B6F4E" }}>{rsvps.length}</div>
            <div style={{ color: "#999", fontFamily: "sans-serif", fontSize: "0.85rem", marginTop: "0.25rem" }}>Total Responses</div>
          </div>
          <div style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", textAlign: "center", boxShadow: "0 2px 12px rgba(139,111,78,0.08)", border: "1px solid #f0e8dc" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#4CAF50" }}>{attending.length}</div>
            <div style={{ color: "#999", fontFamily: "sans-serif", fontSize: "0.85rem", marginTop: "0.25rem" }}>Attending ({totalGuests} guests total)</div>
          </div>
          <div style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", textAlign: "center", boxShadow: "0 2px 12px rgba(139,111,78,0.08)", border: "1px solid #f0e8dc" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#e57373" }}>{declining.length}</div>
            <div style={{ color: "#999", fontFamily: "sans-serif", fontSize: "0.85rem", marginTop: "0.25rem" }}>Declining</div>
          </div>
        </div>

        {/* Table */}
        {rsvps.length === 0 ? (
          <div style={{ background: "white", borderRadius: "1rem", padding: "4rem", textAlign: "center", boxShadow: "0 2px 12px rgba(139,111,78,0.08)" }}>
            <p style={{ color: "#bbb", fontFamily: "sans-serif", fontSize: "1.1rem" }}>No RSVPs yet. Share the website!</p>
          </div>
        ) : (
          <div style={{ background: "white", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 2px 12px rgba(139,111,78,0.08)", border: "1px solid #f0e8dc" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "sans-serif" }}>
              <thead>
                <tr style={{ background: "#8B6F4E", color: "white" }}>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.85rem" }}>Name</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.85rem" }}>Phone</th>
                  <th style={{ padding: "1rem", textAlign: "center", fontWeight: "600", fontSize: "0.85rem" }}>Status</th>
                  <th style={{ padding: "1rem", textAlign: "center", fontWeight: "600", fontSize: "0.85rem" }}>Guests</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.85rem" }}>Message</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.85rem" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((rsvp, i) => (
                  <tr key={rsvp.id} style={{ borderBottom: "1px solid #f0e8dc", background: i % 2 === 0 ? "white" : "#faf8f5" }}>
                    <td style={{ padding: "1rem", fontWeight: "600", color: "#333" }}>{rsvp.name}</td>
                    <td style={{ padding: "1rem", color: "#666" }}>{rsvp.phone}</td>
                    <td style={{ padding: "1rem", textAlign: "center" }}>
                      <span style={{
                        display: "inline-block",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        background: rsvp.attending ? "#e8f5e9" : "#ffebee",
                        color: rsvp.attending ? "#2e7d32" : "#c62828",
                      }}>
                        {rsvp.attending ? "✓ Attending" : "✗ Declining"}
                      </span>
                    </td>
                    <td style={{ padding: "1rem", textAlign: "center", color: "#666" }}>{rsvp.attending ? rsvp.guests : "—"}</td>
                    <td style={{ padding: "1rem", color: "#666", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {rsvp.message || <span style={{ color: "#ccc" }}>—</span>}
                    </td>
                    <td style={{ padding: "1rem", color: "#999", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                      {new Date(rsvp.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Gallery Upload & Management Section */}
        <GalleryManager initialImages={galleryImages} />
      </div>
    </div>
  );
}

