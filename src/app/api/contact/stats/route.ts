import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Contact from '@/models/Contact';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== 'admin' && session.user.role !== 'super_admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const count = await Contact.countDocuments({ read: false });
  return NextResponse.json({ unprocessedCount: count });
}
