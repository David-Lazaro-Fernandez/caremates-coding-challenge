import { createClient } from '@supabase/supabase-js'

export interface Application {
    id?: string
    first_name?: string
    middle_name?: string
    last_name?: string
    zip_code?: string
    terms_accepted?: boolean
    care_type?: 'DAY_CARE' | 'STATIONARY' | 'AMBULATORY'
    finished_at?: Date | null
    created_at?: Date
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const applicantService = {
    async createApplication(applicant: Omit<Application, 'created_at'>): Promise<Application | null> {
        try {
            const { data, error } = await supabase
                .from('Applications')
                .insert([{
                    ...applicant,
                    created_at: new Date().toISOString(),
                }])
                .select()
                .single()

            if (error) {
                console.error('Error creating applicant:', error)
                throw error
            }

            return data
        } catch (error:any) {
            console.error('Detailed error:', {
                name: error.name,
                message: error.message,
                stack: error.stack,
                details: error
            })
            return null
        }
    },

    
    async updateApplication(id: string, updates: Partial<Application>): Promise<Application | null> {
        try {
            const { data, error } = await supabase
                .from('Applications')
                .update(updates)
                .eq('id', id)
                .select()
                .single()

            if (error) {
                console.error('Error updating applicant:', error)
                throw error
            }

            return data
        } catch (error) {
            console.error('Error in update applicant service:', error)
            return null
        }
    },

    // Marcar una aplicación como completada
    async markApplicationAsCompleted(id: string): Promise<Application | null> {
        try {
            const { data, error } = await supabase
                .from('Applications')
                .update({
                    finished_at: new Date().toISOString()
                })
                .eq('id', id)
                .select()
                .single()

            if (error) {
                console.error('Error marking applicant as completed:', error)
                throw error
            }

            return data
        } catch (error) {
            console.error('Error in markAsCompleted service:', error)
            return null
        }
    },

    // Obtener un aplicante por ID
    async getApplicationById(id: string): Promise<Application | null> {
        try {
            const { data, error } = await supabase
                .from('Applications')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                console.error('Error fetching applicant:', error)
                throw error
            }

            return data
        } catch (error) {
            console.error('Error in getById service:', error)
            return null
        }
    }
}