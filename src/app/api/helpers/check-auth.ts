import { NextRequest } from "next/server";
import { cookies } from "next/headers";




export const checkAuth = async (req: NextRequest, cookieName: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get(cookieName);
    if (!token) return false
    else return true
}