import {createClient} from "@supabase/supabase-js";

export default createClient(import.meta.env.VITE_API_SUPABASE_URL,
    import.meta.env.VITE_API_SUPABASE_KEY);