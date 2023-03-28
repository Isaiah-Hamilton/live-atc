export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      airports: {
        Row: {
          city: string | null;
          country: string | null;
          full_name: string | null;
          iata: string | null;
          icao: string;
          keywords: string[] | null;
          latitude: number | null;
          longitude: number | null;
          state: string | null;
          time_zone: string | null;
          views: number;
        };
        Insert: {
          city?: string | null;
          country?: string | null;
          full_name?: string | null;
          iata?: string | null;
          icao: string;
          keywords?: string[] | null;
          latitude?: number | null;
          longitude?: number | null;
          state?: string | null;
          time_zone?: string | null;
          views?: number;
        };
        Update: {
          city?: string | null;
          country?: string | null;
          full_name?: string | null;
          iata?: string | null;
          icao?: string;
          keywords?: string[] | null;
          latitude?: number | null;
          longitude?: number | null;
          state?: string | null;
          time_zone?: string | null;
          views?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
