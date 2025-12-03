// Marketing app - No database connection
// This endpoint is stubbed out for marketing site

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");
    
    if (!token) {
        return NextResponse.json(
            { error: "Token is required" },
            { status: 400 }
        );
    }
    
    // Marketing app doesn't verify emails - return success for demo
    return NextResponse.json(
        { 
            message: "Email verification is not available in marketing mode. Please use the main app."
        },
        { status: 200 }
    );
}
