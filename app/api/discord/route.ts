import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/constants";

export async function GET() {
  try {
    const response = await fetch(
      `https://api.lanyard.rest/v1/users/${SITE_CONFIG.lanyardId}`,
      {
        next: { revalidate: 10 },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ success: false, error: "Lanyard unreachable" }, { status: 502 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
