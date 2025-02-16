export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          car_id: string
          created_at: string
          end_date: string
          id: string
          renter_id: string
          start_date: string
          status: string
          total_price: number
          updated_at: string
        }
        Insert: {
          car_id: string
          created_at?: string
          end_date: string
          id?: string
          renter_id: string
          start_date: string
          status?: string
          total_price: number
          updated_at?: string
        }
        Update: {
          car_id?: string
          created_at?: string
          end_date?: string
          id?: string
          renter_id?: string
          start_date?: string
          status?: string
          total_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_renter_id_fkey"
            columns: ["renter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cars: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          description: string | null
          features: string[] | null
          host_id: string
          id: string
          location: string
          make: string
          model: string
          no_salvage_title: boolean | null
          odometer_reading: number | null
          photos: string[] | null
          postal_code: string | null
          price_per_day: number
          state: string | null
          status: Database["public"]["Enums"]["car_status"] | null
          street_address: string | null
          taxes_paid: boolean | null
          transmission_type: string | null
          type: string | null
          updated_at: string
          vehicle_value: number | null
          vin: string | null
          year: number
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          features?: string[] | null
          host_id: string
          id?: string
          location: string
          make: string
          model: string
          no_salvage_title?: boolean | null
          odometer_reading?: number | null
          photos?: string[] | null
          postal_code?: string | null
          price_per_day: number
          state?: string | null
          status?: Database["public"]["Enums"]["car_status"] | null
          street_address?: string | null
          taxes_paid?: boolean | null
          transmission_type?: string | null
          type?: string | null
          updated_at?: string
          vehicle_value?: number | null
          vin?: string | null
          year: number
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          features?: string[] | null
          host_id?: string
          id?: string
          location?: string
          make?: string
          model?: string
          no_salvage_title?: boolean | null
          odometer_reading?: number | null
          photos?: string[] | null
          postal_code?: string | null
          price_per_day?: number
          state?: string | null
          status?: Database["public"]["Enums"]["car_status"] | null
          street_address?: string | null
          taxes_paid?: boolean | null
          transmission_type?: string | null
          type?: string | null
          updated_at?: string
          vehicle_value?: number | null
          vin?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "cars_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean
          receiver_id: string
          sender_id: string
          trip_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean
          receiver_id: string
          sender_id: string
          trip_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean
          receiver_id?: string
          sender_id?: string
          trip_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_receiver"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sender"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email_verified: boolean | null
          full_name: string | null
          host_description: string | null
          host_since: string | null
          id: string
          is_approved_to_drive: boolean | null
          is_host: boolean
          join_date: string | null
          phone_number: string | null
          phone_verified: boolean | null
          total_cars_listed: number | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email_verified?: boolean | null
          full_name?: string | null
          host_description?: string | null
          host_since?: string | null
          id: string
          is_approved_to_drive?: boolean | null
          is_host?: boolean
          join_date?: string | null
          phone_number?: string | null
          phone_verified?: boolean | null
          total_cars_listed?: number | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email_verified?: boolean | null
          full_name?: string | null
          host_description?: string | null
          host_since?: string | null
          id?: string
          is_approved_to_drive?: boolean | null
          is_host?: boolean
          join_date?: string | null
          phone_number?: string | null
          phone_verified?: boolean | null
          total_cars_listed?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      renter_reviews: {
        Row: {
          booking_id: string
          comment: string | null
          created_at: string
          host_id: string
          id: string
          rating: number
          renter_id: string
          updated_at: string
        }
        Insert: {
          booking_id: string
          comment?: string | null
          created_at?: string
          host_id: string
          id?: string
          rating: number
          renter_id: string
          updated_at?: string
        }
        Update: {
          booking_id?: string
          comment?: string | null
          created_at?: string
          host_id?: string
          id?: string
          rating?: number
          renter_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "renter_reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "renter_reviews_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "renter_reviews_renter_id_fkey"
            columns: ["renter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          booking_id: string
          comment: string | null
          created_at: string
          id: string
          rating: number
          updated_at: string
        }
        Insert: {
          booking_id: string
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          updated_at?: string
        }
        Update: {
          booking_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          created_at: string
          id: string
          pickup_date: string
          pickup_location: string
          return_date: string
          status: string
          user_id: string
          vehicle_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          pickup_date: string
          pickup_location: string
          return_date: string
          status?: string
          user_id: string
          vehicle_type: string
        }
        Update: {
          created_at?: string
          id?: string
          pickup_date?: string
          pickup_location?: string
          return_date?: string
          status?: string
          user_id?: string
          vehicle_type?: string
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
      car_status: "available" | "booked" | "maintenance" | "unlisted"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
