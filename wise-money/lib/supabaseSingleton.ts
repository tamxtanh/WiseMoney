import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eianmciufswbutirdbka.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpYW5tY2l1ZnN3YnV0aXJkYmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MzIzODcsImV4cCI6MjAyNTAwODM4N30.qrZhYuCaD8CArIad_izxjj9tQeFEliFM8jmz9w9WIR4';

class SupabaseSingleton {
    static instance: SupabaseSingleton | null = null;
    private supabase: SupabaseClient;

    private constructor() {
        this.supabase = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
                storage: AsyncStorage,
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: false,
            },
        });
    }

    static getInstance(): SupabaseSingleton {
        if (!SupabaseSingleton.instance) {
            SupabaseSingleton.instance = new SupabaseSingleton();
        }
        return SupabaseSingleton.instance;
    }

    getClient(): SupabaseClient {
        return this.supabase;
    }
}

export default SupabaseSingleton;
