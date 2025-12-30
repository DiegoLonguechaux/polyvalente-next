import { authOptions } from '@/lib/auth';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Sécurité : Seuls les admins peuvent uploader
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== 'admin' && session.user.role !== 'super_admin')) {
          throw new Error('Unauthorized');
        }

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
          tokenPayload: JSON.stringify({
            // optional payload
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // On pourrait logger l'upload ici si besoin
        console.log('Upload completed:', blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
