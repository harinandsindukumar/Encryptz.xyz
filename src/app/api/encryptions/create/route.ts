import { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = await createClient();

    // Get the user session
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse the request body
    const { name } = await request.json();

    if (!name) {
      return Response.json({ error: 'Name is required' }, { status: 400 });
    }

    // Create the encryption
    const { data, error } = await supabase
      .from('encryptions')
      .insert([
        {
          name,
          user_id: user.id,
          created_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ encryption: data }, { status: 200 });
  } catch (error) {
    console.error('Error creating encryption:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}