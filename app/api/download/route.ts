export const runtime = 'edge'

import { getRequestContext } from '@cloudflare/next-on-pages'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    
    if (!filename || typeof filename !== 'string') {
      return new Response('Filename is required and must be a string', { status: 400 });
    }
    
    const { env } = getRequestContext();
    
    const download = await env.BUCKET.get(filename);
    console.log(download?.httpMetadata?.contentType);
    
    console.log("File uploaded successfully");
    return new Response(download?.body);
  } catch (error) {
    console.error('Error downloading file:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
