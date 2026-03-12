/**
 * Supabase database types.
 * Extend this with your table types as you create them in Supabase.
 * You can also generate types with: npx supabase gen types typescript --project-id YOUR_REF > src/types/database.ts
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Example – add your tables here as you create them, e.g.:
      // hotels: { Row: { id: string; name: string; ... }; Insert: { ... }; Update: { ... } }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
