// Marketing app - No database connection
// This endpoint is stubbed out for marketing site

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsed = forgotPasswordSchema.safeParse(body);
        
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }
        
        // Marketing app doesn't process password resets - return success for demo
        return NextResponse.json(
            { 
                message: "Password reset email sent (demo mode). Please use the main app for password reset."
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
