import { createClient } from '@supabase/supabase-js'

const URL = 'https://qdfimoumtmosayjzjdnx.supabase.co'

const API_KEY = 'sb_publishable_nR0OGg_aKkfBzT5JIWtE1w_OCSQxsLc'

export const supabase = createClient(URL, API_KEY)
