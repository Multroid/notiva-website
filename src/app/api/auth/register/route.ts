// Marketing app - No database connection
// This endpoint is stubbed out for marketing site

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsed = registerSchema.safeParse(body);
        
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Validation failed", details: parsed.error.issues },
                { status: 400 }
            );
        }
        
        // Marketing app doesn't create users - return success for demo
        return NextResponse.json(
            { 
                message: "Registration endpoint is not available in marketing mode. Please use the main app for registration.",
                redirect: "/login"
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
