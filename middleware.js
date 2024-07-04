"use client"
import { NextResponse } from 'next/server'
import { supabase } from './app/config/configure'

export async function middleware(req) {
    const { data: session } = await supabase.auth.getSession();

    // Define your protected routes
    const protectedRoutes = ['/dashboard'];

    if (protectedRoutes.includes(req.nextUrl.pathname)) {
        if (!session) {
            const url = req.nextUrl;
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard'],
};
