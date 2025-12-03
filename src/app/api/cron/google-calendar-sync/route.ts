// Marketing app - No database connection
// This endpoint is stubbed out for marketing site

import { NextResponse } from "next/server";

export async function GET() {
    // Marketing app doesn't sync Google Calendar - return success
    return NextResponse.json(
        { 
            message: "Google Calendar sync cron is not active in marketing mode.",
            reconciled: 0
        },
        { status: 200 }
    );
}
