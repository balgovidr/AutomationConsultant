import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { MongoClient } from "mongodb";
import { createClient } from "@/utils/supabaseServer.js";

const MONGODB_URI = process.env.MONGODB_URI;

export async function GET() {
  try {
    // Connect to MongoDB
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db("reci");
    const collection = db.collection("digital_signatures");

    // Get all jobs
    const jobs = await collection.find({}).toArray();
    await client.close();

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
