import { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get the user session
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get encryptions for the user
    const { data, error } = await supabase
      .from('encryptions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ encryptions: data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching encryptions:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}