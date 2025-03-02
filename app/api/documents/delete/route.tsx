export const runtime = 'edge'

import { getRequestContext } from '@cloudflare/next-on-pages'
import { type NextRequest } from 'next/server'
import { auth } from '@/lib/auth';

export async function DELETE(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await auth()
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    
    if (!filename || typeof filename !== 'string') {
      return new Response('Filename is required and must be a string', { status: 400 });
    }
    
    const { env } = getRequestContext();
    
    await env.BUCKET.delete(filename);
    
    console.log(`File ${filename} deleted successfully`);
    return new Response('File deleted successfully', { status: 200 });
  } catch (error) {
    console.error('Error deleting file:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
