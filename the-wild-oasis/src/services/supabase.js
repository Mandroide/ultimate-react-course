import {createClient} from "@supabase/supabase-js";

export default createClient(import.meta.env.VITE_API_BASE_URL,
    import.meta.env.VITE_API_KEY);