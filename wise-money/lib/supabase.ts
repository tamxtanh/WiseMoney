// import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eianmciufswbutirdbka.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpYW5tY2l1ZnN3YnV0aXJkYmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MzIzODcsImV4cCI6MjAyNTAwODM4N30.qrZhYuCaD8CArIad_izxjj9tQeFEliFM8jmz9w9WIR4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})