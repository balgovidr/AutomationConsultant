'use server'
import { createClient } from '@/utils/supabaseServer.js'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { email, password } = await request.json()
  const supabase = await createClient()

  const { data, error} = await supabase.auth.signInWithPassword({ email, password })

  if (!data?.user?.user_metadata?.email_verified) {
    // Log out the user if not verified
    await supabase.auth.signOut()

    return NextResponse.json({ error: "Please click the link in your email to verify your account to proceed." }, { status: 403 })
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 })
  }

  // Supabase sets the cookies automatically
  return NextResponse.json({ success: true })
}