import { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const cookieStore = cookies();
    const supabase = await createClient();

    // Get the user session
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    // Allow access for shared pages, but verify ownership for user's own pages
    const { data: encryption, error } = await supabase
      .from('encryptions')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !encryption) {
      return Response.json({ error: 'Encryption not found' }, { status: 404 });
    }

    // If user is logged in and accessing their own encryption page, verify ownership
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    if (pathname.includes('/encrypt/') && user && user.id !== encryption.user_id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return Response.json({ encryption }, { status: 200 });
  } catch (error) {
    console.error('Error fetching encryption:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const cookieStore = cookies();
    const supabase = await createClient();

    // Get the user session
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete the encryption
    const { error } = await supabase
      .from('encryptions')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id); // Ensure the user owns the encryption

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ message: 'Encryption deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting encryption:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}