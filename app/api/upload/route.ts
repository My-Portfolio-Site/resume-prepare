export const runtime = 'edge'

import { getRequestContext } from '@cloudflare/next-on-pages'
import { type NextRequest, type NextResponse } from 'next/server'


export async function POST(request: NextRequest ) {
  try {
    const data = await request.formData();
    // console.log(data);
    const { env } = getRequestContext();

    const file: File | null = data.get("file") as unknown as File;
    // console.log(file);

    if (!file) {
      return Response.json({error: "No file found in request"}, { status: 400 });
    }

    const upload = await env.BUCKET.put(file.name, await file.arrayBuffer());

    console.log(`File ${upload?.key} uploaded successfully`);
    return Response.json({message:`File ${upload?.key} uploaded successfully`});
  } catch (error) {
    console.error('Error uploading file:', error);
    return Response.json({error: "Failed to upload file"}, { status: 500 });
  }
}
