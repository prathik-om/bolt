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
      academic_years: {
        Row: {
          id: string
          school_id: string
          name: string
          start_date: string
          end_date: string
        }
        Insert: {
          id?: string
          school_id: string
          name: string
          start_date: string
          end_date: string
        }
        Update: {
          id?: string
          school_id?: string
          name?: string
          start_date?: string
          end_date?: string
        }
      }
      class_offerings: {
        Row: {
          id: string
          term_id: string
          class_section_id: string
          subject_id: string
          periods_per_week: number
        }
        Insert: {
          id?: string
          term_id: string
          class_section_id: string
          subject_id: string
          periods_per_week: number
        }
        Update: {
          id?: string
          term_id?: string
          class_section_id?: string
          subject_id?: string
          periods_per_week?: number
        }
      }
      class_sections: {
        Row: {
          id: string
          school_id: string
          grade_level: number
          name: string
          student_count: number
          class_teacher_id: string | null
          is_active: boolean
        }
        Insert: {
          id?: string
          school_id: string
          grade_level: number
          name: string
          student_count?: number
          class_teacher_id?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          school_id?: string
          grade_level?: number
          name?: string
          student_count?: number
          class_teacher_id?: string | null
          is_active?: boolean
        }
      }
      holidays: {
        Row: {
          id: string
          term_id: string
          date: string
          reason: string
        }
        Insert: {
          id?: string
          term_id: string
          date: string
          reason: string
        }
        Update: {
          id?: string
          term_id?: string
          date?: string
          reason?: string
        }
      }
      rooms: {
        Row: {
          id: string
          school_id: string
          name: string
          capacity: number
          room_type: string
          is_active: boolean
        }
        Insert: {
          id?: string
          school_id: string
          name: string
          capacity?: number
          room_type: string
          is_active?: boolean
        }
        Update: {
          id?: string
          school_id?: string
          name?: string
          capacity?: number
          room_type?: string
          is_active?: boolean
        }
      }
      scheduled_lessons: {
        Row: {
          id: number
          generation_id: string
          teaching_assignment_id: string
          room_id: string | null
          date: string
          timeslot_id: string
          status: string
          substitute_teacher_id: string | null
          notes: string | null
        }
        Insert: {
          id?: number
          generation_id: string
          teaching_assignment_id: string
          room_id?: string | null
          date: string
          timeslot_id: string
          status?: string
          substitute_teacher_id?: string | null
          notes?: string | null
        }
        Update: {
          id?: number
          generation_id?: string
          teaching_assignment_id?: string
          room_id?: string | null
          date?: string
          timeslot_id?: string
          status?: string
          substitute_teacher_id?: string | null
          notes?: string | null
        }
      }
      schools: {
        Row: {
          id: string
          name: string
          board_affiliation: string | null
          address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          board_affiliation?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          board_affiliation?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subjects: {
        Row: {
          id: string
          school_id: string
          name: string
          code: string | null
          subject_type: string | null
          required_room_type: string | null
          is_active: boolean
        }
        Insert: {
          id?: string
          school_id: string
          name: string
          code?: string | null
          subject_type?: string | null
          required_room_type?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          school_id?: string
          name?: string
          code?: string | null
          subject_type?: string | null
          required_room_type?: string | null
          is_active?: boolean
        }
      }
      teacher_qualifications: {
        Row: {
          id: string
          teacher_id: string
          subject_id: string
        }
        Insert: {
          id?: string
          teacher_id: string
          subject_id: string
        }
        Update: {
          id?: string
          teacher_id?: string
          subject_id?: string
        }
      }
      teachers: {
        Row: {
          id: string
          school_id: string
          user_id: string | null
          first_name: string
          last_name: string
          email: string
          max_periods_per_week: number
          employment_type: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          school_id: string
          user_id?: string | null
          first_name: string
          last_name: string
          email: string
          max_periods_per_week?: number
          employment_type?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          school_id?: string
          user_id?: string | null
          first_name?: string
          last_name?: string
          email?: string
          max_periods_per_week?: number
          employment_type?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      teaching_assignments: {
        Row: {
          id: string
          class_offering_id: string
          teacher_id: string
        }
        Insert: {
          id?: string
          class_offering_id: string
          teacher_id: string
        }
        Update: {
          id?: string
          class_offering_id?: string
          teacher_id?: string
        }
      }
      terms: {
        Row: {
          id: string
          academic_year_id: string
          name: string
          start_date: string
          end_date: string
        }
        Insert: {
          id?: string
          academic_year_id: string
          name: string
          start_date: string
          end_date: string
        }
        Update: {
          id?: string
          academic_year_id?: string
          name?: string
          start_date?: string
          end_date?: string
        }
      }
      time_slots: {
        Row: {
          id: string
          school_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_teaching_period: boolean
          slot_name: string | null
        }
        Insert: {
          id?: string
          school_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_teaching_period?: boolean
          slot_name?: string | null
        }
        Update: {
          id?: string
          school_id?: string
          day_of_week?: number
          start_time?: string
          end_time?: string
          is_teaching_period?: boolean
          slot_name?: string | null
        }
      }
      timetable_generations: {
        Row: {
          id: string
          term_id: string
          generated_by: string | null
          generated_at: string
          status: string
          notes: string | null
        }
        Insert: {
          id?: string
          term_id: string
          generated_by?: string | null
          generated_at?: string
          status?: string
          notes?: string | null
        }
        Update: {
          id?: string
          term_id?: string
          generated_by?: string | null
          generated_at?: string
          status?: string
          notes?: string | null
        }
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