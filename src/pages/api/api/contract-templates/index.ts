import { NextApiRequest, NextApiResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function GET(req: Request) {
  try {
    const { data, error } = await supabase
      .from('contract_templates')
      .select('id, name');

    if (error) {
      console.error('Error fetching contract templates:', error);
      return new Response(JSON.stringify({ message: 'テンプレートの取得に失敗しました。' }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return new Response(JSON.stringify({ message: 'テンプレートの取得に失敗しました。' }), { status: 500 });
  }
}