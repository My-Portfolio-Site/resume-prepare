export const runtime = 'edge'

import { getRequestContext } from '@cloudflare/next-on-pages'
import { type NextRequest, type NextResponse } from 'next/server'

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const { env } = getRequestContext();
    const resp = await env.BUCKET.list({
      limit: 50,
      include: ["customMetadata"],
    });
    
    const files: string[] = resp.objects.map(object => object.key);
    // console.log(resp.objects);
    
    
    console.log("Files retrieved successfully");
    return Response.json({files});
  } catch (error) {
    console.error("Error fetching files:", error);
    return Response.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}
