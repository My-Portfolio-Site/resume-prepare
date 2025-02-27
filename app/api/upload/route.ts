
export const runtime = 'edge'

import { getRequestContext } from '@cloudflare/next-on-pages'
import { type NextRequest, type NextResponse } from 'next/server'


export async function POST(request: NextRequest ) {
  
  const data = await request.formData();
  // console.log(data);
  const { env } = getRequestContext();

  const file: File | null = data.get("file") as unknown as File;
  // console.log(file);

  if (!file) {
    return new Response("No file found in request", { status: 400 });
  }
  console.log(file.name);
  
  const upload = await env.BUCKET.put(file.name, await file.arrayBuffer());
  
  console.log(`File ${upload?.key} uploaded successfully`);
  return new Response(`File ${upload?.key} uploaded successfully`);
}
