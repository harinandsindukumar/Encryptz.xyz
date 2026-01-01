import { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = await createClient();

    // Parse the request body
    const { name, email, subject, message, type } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message || !type) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Validate type
    if (!['feedback', 'report'].includes(type)) {
      return Response.json({ error: 'Invalid feedback type' }, { status: 400 });
    }

    // Insert the feedback into the database
    const { error } = await supabase
      .from('feedback')
      .insert([
        {
          name,
          email,
          subject,
          message,
          type,
        }
      ]);

    if (error) {
      console.error('Error inserting feedback:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ message: 'Feedback submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}