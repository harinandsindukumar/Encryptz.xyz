'use server';

import { createClient } from '@/utils/supabase/server';

export async function createEncryption(userId: string, name: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('encryptions')
    .insert([
      {
        name,
        user_id: userId,
        created_at: new Date().toISOString(),
      }
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getEncryptionById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('encryptions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getEncryptionsByUserId(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('encryptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteEncryption(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('encryptions')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}