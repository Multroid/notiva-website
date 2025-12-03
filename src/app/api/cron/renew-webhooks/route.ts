// Marketing app - No database connection
// This endpoint is stubbed out for marketing site

import { NextResponse } from "next/server";

export async function GET() {
    // Marketing app doesn't renew webhooks - return success
    return NextResponse.json(
        { 
            message: "Webhook renewal cron is not active in marketing mode.",
            renewed: 0,
            cleaned: 0
        },
        { status: 200 }
    );
}
