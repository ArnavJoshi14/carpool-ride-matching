
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.get("/", (req, res) => res.json({ ok: true, msg: "Campus Carpool API (backend)" }));

// Rides
app.get("/rides", async (req, res) => {
  const { data, error } = await supabase.from("Ride").select("*").order("departure_time", { ascending: true });
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post("/rides", async (req, res) => {
  const payload = req.body;
  const { data, error } = await supabase.from("Ride").insert([payload]).select().single();
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// Requests
app.post("/rides/:rideId/requests", async (req, res) => {
  const rideId = Number(req.params.rideId);
  const { user_id } = req.body;
  const { data, error } = await supabase.from("Request").insert([{ ride_id: rideId, user_id }]).select().single();
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// Basic chat write endpoint (optional: clients can insert directly using Supabase client)
app.post("/chat", async (req, res) => {
  const { ride_id, sender_id, message } = req.body;
  const { data, error } = await supabase.from("Chat").insert([{ ride_id, sender_id, message }]).select().single();
  if (error) return res.status(500).json({ error });
  res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
