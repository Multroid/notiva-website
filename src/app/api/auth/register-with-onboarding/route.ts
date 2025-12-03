// Marketing app - No database connection
// This endpoint is stubbed out for marketing site

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    // Marketing app doesn't create users - return success for demo
    return NextResponse.json(
        { 
            message: "Registration endpoint is not available in marketing mode. Please use the main app for registration.",
            redirect: "/login"
        },
        { status: 200 }
    );
}
