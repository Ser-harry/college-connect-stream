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
      applications: {
        Row: {
          academic_details: Json | null
          college_preferences: Json | null
          created_at: string | null
          id: string
          personal_details: Json | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          academic_details?: Json | null
          college_preferences?: Json | null
          created_at?: string | null
          id?: string
          personal_details?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          academic_details?: Json | null
          college_preferences?: Json | null
          created_at?: string | null
          id?: string
          personal_details?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      colleges: {
        Row: {
          college_type: string | null
          courses: number | null
          created_at: string | null
          exams_accepted: string[] | null
          fees: string | null
          fees_numeric: number | null
          id: number
          image: string | null
          location: string | null
          name: string
          placement_rate: number | null
          ranking: string | null
          rating: number | null
          stream: string | null
        }
        Insert: {
          college_type?: string | null
          courses?: number | null
          created_at?: string | null
          exams_accepted?: string[] | null
          fees?: string | null
          fees_numeric?: number | null
          id: number
          image?: string | null
          location?: string | null
          name: string
          placement_rate?: number | null
          ranking?: string | null
          rating?: number | null
          stream?: string | null
        }
        Update: {
          college_type?: string | null
          courses?: number | null
          created_at?: string | null
          exams_accepted?: string[] | null
          fees?: string | null
          fees_numeric?: number | null
          id?: number
          image?: string | null
          location?: string | null
          name?: string
          placement_rate?: number | null
          ranking?: string | null
          rating?: number | null
          stream?: string | null
        }
        Relationships: []
      }
      cutoffs: {
        Row: {
          branch: string
          category: string
          college_id: number
          created_at: string | null
          cutoff_mark: number
          id: string
          year: number
        }
        Insert: {
          branch: string
          category: string
          college_id: number
          created_at?: string | null
          cutoff_mark: number
          id?: string
          year?: number
        }
        Update: {
          branch?: string
          category?: string
          college_id?: number
          created_at?: string | null
          cutoff_mark?: number
          id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "cutoffs_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string | null
          file_type: string
          file_url: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          file_type: string
          file_url: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          file_type?: string
          file_url?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          community: string | null
          created_at: string | null
          cutoff_mark: number | null
          full_name: string | null
          id: string
          phone: string | null
          region: string | null
          updated_at: string | null
        }
        Insert: {
          community?: string | null
          created_at?: string | null
          cutoff_mark?: number | null
          full_name?: string | null
          id: string
          phone?: string | null
          region?: string | null
          updated_at?: string | null
        }
        Update: {
          community?: string | null
          created_at?: string | null
          cutoff_mark?: number | null
          full_name?: string | null
          id?: string
          phone?: string | null
          region?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
