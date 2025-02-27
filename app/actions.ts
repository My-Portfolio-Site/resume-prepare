// export const runtime = 'edge';
// // 'use server'

// import { getRequestContext } from '@cloudflare/next-on-pages';

// const { env, cf, ctx } = getRequestContext();

// export async function uploadFile(formData: FormData): Promise<void>{
//   const file = formData.get("file") as File;
//   const upload = await env.BUCKET.put(file.name, file);
//   console.log(upload);
  
//   console.log("File uploaded successfully");
// }