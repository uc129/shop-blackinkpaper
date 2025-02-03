import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserModel } from './app/api/users/model';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const cookies = request.cookies.get('authToken');
    const role = request.cookies.get('role');

    if (cookies && role?.value === 'admin') {
        return NextResponse.next()
    }
    else if (cookies && role?.value === 'user') {
        return NextResponse.next()
    }
    else return NextResponse.redirect(new URL('/login', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/admin/:path*', '/user/:path*',]
}