// Marketing app - No database connection
// This endpoint is stubbed out for marketing site

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        
        // Marketing app doesn't support account switching - return success for demo
        return NextResponse.json(
            { 
                message: "Account switching is not available in marketing mode."
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Switch account error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
