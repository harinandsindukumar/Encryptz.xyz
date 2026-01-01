import { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = cookies();
    const supabase = await createClient();

    // Get the user session
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    // For shared pages, we allow access without authentication
    // Check if this is a shared page by looking at the referer or path
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    if (pathname.includes('/encrypt/')) {
      // This is a user's private encryption page - require authentication
      if (authError || !user) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // Verify the user owns this encryption
      const { data: encryption, error } = await supabase
        .from('encryptions')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error || !encryption) {
        return Response.json({ error: 'Encryption not found or you do not have access to it' }, { status: 404 });
      }

      return Response.json({ encryption }, { status: 200 });
    } else {
      // This could be accessed from a shared link - allow access
      const { data: encryption, error } = await supabase
        .from('encryptions')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !encryption) {
        return Response.json({ error: 'Encryption not found' }, { status: 404 });
      }

      return Response.json({ encryption }, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching encryption:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}