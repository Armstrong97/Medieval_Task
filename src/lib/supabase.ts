import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Copia .env.example a .env.local y completa los valores de tu proyecto Supabase.',
  )
}

// TODO: una vez existan las migraciones del schema (Fase 1), generar los tipos
// con `supabase gen types typescript --local > src/types/database.types.ts`
// y tipar el cliente como createClient<Database>(...).
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
