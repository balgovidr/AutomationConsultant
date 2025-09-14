import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabaseServer.js";

export async function middleware(request) {	
	try {
		// Skip middleware for login route
		const { pathname } = request.nextUrl;
		if (pathname === '/api/login') {
			return NextResponse.next() // Skip the middleware logic for this path
		}

		const supabase = await createClient();
		const { data: { user: serverUser } } = await supabase.auth.getUser();

		// Optionally, get client-side user from a custom header or cookie
		const clientUserId = request.cookies.get("sb-client-user-id")?.value;

		if (!serverUser || (clientUserId && clientUserId !== serverUser.id)) {
			// Respond with a header to indicate logout is needed
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}
	} catch (error) {
		// No user found or an error occurred, log out the client
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		* Match all request paths except for the ones starting with:
		* - _next/static (static files)
		* - _next/image (image optimization files)
		* - favicon.ico (favicon file)
		*/
		'/api/:path*',
	],
}