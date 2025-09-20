import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { createClient } from "@/utils/supabaseServer.js";

const MONGODB_URI = process.env.MONGODB_URI;

export async function POST(request) {
  try {
    const { tableId, riskAttributes } = await request.json();
    if (!tableName || !riskAttributes) {
      return NextResponse.json({ error: "Missing table name or risk attributes" }, { status: 400 });
    }

    // Get the logged in user's email
    const supabase = await createClient();
    const { data: { user: serverUser } } = await supabase.auth.getUser();

    // Connect to MongoDB
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db("app");
    const collection = db.collection("risk_register_data");

    // Insert risks
    await collection.insertMany(riskAttributes.map(attrs => ({
      ...attrs,
      tableId,
      createdAt: new Date(),
      createdBy: serverUser?.email || null,
    })));
    await client.close();

    return NextResponse.json({ status: 200, message: "Risks added successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
