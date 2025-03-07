import { createClient } from "@supabase/supabase-js";

export interface Application {
  id?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  zip_code?: string;
  terms_accepted?: boolean;
  care_type?: "DAY_CARE" | "STATIONARY" | "AMBULATORY";
  finished_at?: Date | null;
  created_at?: Date;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const applicantService = {
  async createApplication(
    applicant: Omit<Application, "created_at">,
  ): Promise<Application | null> {
    try {
      const id = new Date().toISOString();
      const { data, error } = await supabase
        .from("Applications")
        .insert([
          {
            ...applicant,
            created_at: id,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Detailed error:", {
          name: error.name,
          message: error.message,
          stack: error.stack,
          details: error,
        });
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error("Detailed error:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
        details: error,
      });
      return null;
    }
  },

  async updateApplication(
    id: string,
    updates: Partial<Application>,
  ): Promise<Application | null> {
    try {
      const { data, error } = await supabase
        .from("Applications")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Detailed error:", {
          name: error.name,
          message: error.message,
          stack: error.stack,
          details: error,
        });
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error("Detailed error:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
        details: error,
      });
      return null;
    }
  },

  async markApplicationAsCompleted(id: string): Promise<Application | null> {
    try {
      const { data, error } = await supabase
        .from("Applications")
        .update({
          finished_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Detailed error:", {
          name: error.name,
          message: error.message,
          stack: error.stack,
          details: error,
        });
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error("Detailed error:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
        details: error,
      });
      return null;
    }
  },

  async getApplicationById(id: string): Promise<Application | null> {
    try {
      const { data, error } = await supabase
        .from("Applications")
        .select("*")
        .eq("id", id)
        .single();
      return data;
    } catch (error: any) {
      console.error("Detailed error:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
        details: error,
      });
      return null;
    }
  },

  async getAllApplications(): Promise<Application[] | null> {
    try {
      const { data, error } = await supabase
        .from("Applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error.message);
        return null;
      }
      return data as Application[];
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Detailed error:", {
          name: err.name,
          message: err.message,
          stack: err.stack,
          details: err,
        });
      } else {
        console.error("An unexpected error occurred:", err);
      }
      return null;
    }
  },
};
