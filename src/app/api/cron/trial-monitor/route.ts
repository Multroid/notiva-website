// Marketing app - No database connection
// This endpoint is stubbed out for marketing site

import { NextResponse } from "next/server";

export async function GET() {
    // Marketing app doesn't monitor trials - return success
    return NextResponse.json(
        { 
            message: "Trial monitor cron is not active in marketing mode.",
            processed: 0
        },
        { status: 200 }
    );
}
