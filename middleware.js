"use client"
import { NextResponse } from 'next/server'
import { supabase } from './app/lib/configure'

export async function middleware(request) {
    const { data: { user }, error } = await supabase.auth.getSession()

    if (error || !user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard'],
}
