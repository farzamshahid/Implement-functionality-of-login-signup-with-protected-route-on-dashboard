import { NextResponse } from 'next/server';
import { supabase } from './app/lib/configure';
export async function middleware(request) {
    const { data, error } = await supabase.auth.getSession();

    console.log('data', data);

    if (!data.session || error) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard'],
};
