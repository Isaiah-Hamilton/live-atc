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
      "airport frequencies": {
        Row: {
          airport: string | null
          audio: string | null
          facility: string | null
          frequency: number | null
          id: string
          name: string | null
          status: boolean | null
        }
        Insert: {
          airport?: string | null
          audio?: string | null
          facility?: string | null
          frequency?: number | null
          id?: string
          name?: string | null
          status?: boolean | null
        }
        Update: {
          airport?: string | null
          audio?: string | null
          facility?: string | null
          frequency?: number | null
          id?: string
          name?: string | null
          status?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "airport frequencies_airport_fkey"
            columns: ["airport"]
            referencedRelation: "airports"
            referencedColumns: ["id"]
          }
        ]
      }
      airports: {
        Row: {
          city: string | null
          country: string | null
          created_at: string | null
          id: string
          lat: number | null
          lon: number | null
          name: string | null
          region: string | null
          updated_at: string | null
          views: number | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          id: string
          lat?: number | null
          lon?: number | null
          name?: string | null
          region?: string | null
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          lat?: number | null
          lon?: number | null
          name?: string | null
          region?: string | null
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
