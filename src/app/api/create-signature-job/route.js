import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { MongoClient } from "mongodb";
import { createClient } from "@/utils/supabaseServer.js";

const MONGODB_URI = process.env.MONGODB_URI;

export async function POST(request) {
  try {
    const { folderLink } = await request.json();
    if (!folderLink) {
      return NextResponse.json({ error: "Missing folderLink" }, { status: 400 });
    }

    const jobId = uuidv4();

    // Get the logged in user's email
    const supabase = await createClient();
    const { data: { user: serverUser } } = await supabase.auth.getUser();

    // Connect to MongoDB
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db("reci");
    const collection = db.collection("digital_signatures");

    // Insert job
    await collection.insertOne({ jobId, folderLink, createdAt: new Date(), status: "queued", email: serverUser?.email || null });
    await client.close();

    return NextResponse.json({ jobId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
