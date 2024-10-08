import dotenv from 'dotenv';

dotenv.config();

export const SUPABASE_URL = process.env.SUPABASE_URL!;
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;
export const PINATA_JWT = process.env.PINATA_JWT!;
export const PINATA_GATEWAY = process.env.PINATA_GATEWAY!;

