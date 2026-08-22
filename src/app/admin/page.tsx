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
    <div className="min-h-screen bg-[#faf8f5] py-6 px-3 sm:px-6 md:py-12 font-serif">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <img
            src="/logo.png"
            alt="Rashmi & Aditya Monogram"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto mb-3"
          />
          <h1 className="text-2xl sm:text-4xl text-[#8B6F4E] font-bold mb-1">
            👑 Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-sans">Rashmi &amp; Aditya — Wedding Portal</p>
        </div>

        <h2 className="text-xl sm:text-2xl text-[#8B6F4E] font-semibold mb-4">
          💌 RSVP Responses
        </h2>

        {/* Stats Grid - Responsive 1 col on mobile, 3 cols on tablet/desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 sm:p-5 text-center shadow-sm shadow-amber-900/5 border border-amber-100">
            <div className="text-3xl sm:text-4xl font-bold text-[#8B6F4E]">{rsvps.length}</div>
            <div className="text-xs sm:text-sm text-stone-500 font-sans mt-1">Total Responses</div>
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-5 text-center shadow-sm shadow-amber-900/5 border border-amber-100">
            <div className="text-3xl sm:text-4xl font-bold text-emerald-600">{attending.length}</div>
            <div className="text-xs sm:text-sm text-stone-500 font-sans mt-1">Attending ({totalGuests} guests)</div>
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-5 text-center shadow-sm shadow-amber-900/5 border border-amber-100">
            <div className="text-3xl sm:text-4xl font-bold text-rose-500">{declining.length}</div>
            <div className="text-xs sm:text-sm text-stone-500 font-sans mt-1">Declining</div>
          </div>
        </div>

        {/* RSVP Section */}
        {rsvps.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center shadow-sm border border-amber-100 mb-10">
            <p className="text-stone-400 font-sans text-sm sm:text-base">No RSVPs yet. Share the website!</p>
          </div>
        ) : (
          <div className="mb-10">
            {/* Mobile View: Clean Responsive Cards */}
            <div className="block sm:hidden space-y-3 font-sans">
              {rsvps.map((rsvp) => (
                <div key={rsvp.id} className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900 text-base">{rsvp.name}</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      rsvp.attending ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                    }`}>
                      {rsvp.attending ? "✓ Attending" : "✗ Declining"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-600">
                    <span>📞 {rsvp.phone}</span>
                    <span>👥 {rsvp.attending ? `${rsvp.guests} guests` : "0 guests"}</span>
                  </div>

                  {rsvp.message && (
                    <div className="text-xs bg-amber-50/50 p-2.5 rounded-lg text-stone-700 italic border border-amber-100/50">
                      &quot;{rsvp.message}&quot;
                    </div>
                  )}

                  <div className="text-[10px] text-stone-400 text-right">
                    {new Date(rsvp.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop/Tablet View: Full Table */}
            <div className="hidden sm:block bg-white rounded-2xl overflow-hidden shadow-sm border border-amber-100">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse font-sans text-sm">
                  <thead>
                    <tr className="bg-[#8B6F4E] text-white">
                      <th className="p-3.5 text-left font-semibold">Name</th>
                      <th className="p-3.5 text-left font-semibold">Phone</th>
                      <th className="p-3.5 text-center font-semibold">Status</th>
                      <th className="p-3.5 text-center font-semibold">Guests</th>
                      <th className="p-3.5 text-left font-semibold">Message</th>
                      <th className="p-3.5 text-left font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rsvps.map((rsvp, i) => (
                      <tr key={rsvp.id} className={`border-b border-amber-100 ${i % 2 === 0 ? "bg-white" : "bg-[#faf8f5]"}`}>
                        <td className="p-3.5 font-semibold text-stone-900">{rsvp.name}</td>
                        <td className="p-3.5 text-stone-600">{rsvp.phone}</td>
                        <td className="p-3.5 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            rsvp.attending ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                          }`}>
                            {rsvp.attending ? "✓ Attending" : "✗ Declining"}
                          </span>
                        </td>
                        <td className="p-3.5 text-center text-stone-600">{rsvp.attending ? rsvp.guests : "—"}</td>
                        <td className="p-3.5 text-stone-600 max-w-[200px] truncate">
                          {rsvp.message || <span className="text-stone-300">—</span>}
                        </td>
                        <td className="p-3.5 text-stone-400 text-xs whitespace-nowrap">
                          {new Date(rsvp.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Upload & Management Section */}
        <GalleryManager initialImages={galleryImages} />
      </div>
    </div>
  );
}

