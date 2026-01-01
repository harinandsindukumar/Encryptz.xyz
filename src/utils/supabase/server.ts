import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or Anon Key');
  }

  // For server components, we'll implement a basic cookie handling
  // that works with Next.js server actions and components
  const cookieStore = {
    get: (name: string) => {
      // In server components, we get cookies using the cookies() function
      return undefined; // This will be handled in the actual function
    },
    set: (name: string, value: string, options: Partial<CookieOptions> = {}) => {
      // In server components, we set cookies using the cookies() function
    },
    remove: (name: string, options: Partial<CookieOptions> = {}) => {
      // In server components, we remove cookies using the cookies() function
    }
  };
  
  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          try {
            // Access the cookies in the actual function
            const { cookies } = require('next/headers');
            const cookieStore = cookies();
            return cookieStore.get(name)?.value;
          } catch (error) {
            return undefined;
          }
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            // Set the cookie in the actual function
            const { cookies } = require('next/headers');
            const cookieStore = cookies();
            cookieStore.set(name, value, options);
          } catch (error) {
            // The set method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            // Remove the cookie in the actual function
            const { cookies } = require('next/headers');
            const cookieStore = cookies();
            cookieStore.set(name, '', { ...options, maxAge: 0 });
          } catch (error) {
            // Similar to set, this can be ignored if needed.
          }
        },
      },
    }
  );
}