import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const expectedPassword = process.env.ADMIN_PASSWORD || "Poonam@0203";

  if (password === expectedPassword) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });
    return res;
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
