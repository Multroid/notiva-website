// Marketing app - No database connection
// This endpoint is stubbed out for marketing site

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const resetPasswordSchema = z.object({
    token: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsed = resetPasswordSchema.safeParse(body);
        
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Validation failed", details: parsed.error.issues },
                { status: 400 }
            );
        }
        
        // Marketing app doesn't reset passwords - return success for demo
        return NextResponse.json(
            { 
                message: "Password reset is not available in marketing mode. Please use the main app."
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
