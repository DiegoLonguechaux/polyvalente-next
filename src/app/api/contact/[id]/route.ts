import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Contact from '@/models/Contact';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== 'admin' && session.user.role !== 'super_admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const contact = await Contact.findByIdAndDelete(id);
  
  if (!contact) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  }
  
  return NextResponse.json({ message: 'Message deleted' });
}
