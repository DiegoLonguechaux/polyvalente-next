import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Event from '@/models/Event';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const events = await Event.find({}).sort({ date: 1 });
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== 'admin' && session.user.role !== 'super_admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  await dbConnect();

  // Generate slug from title
  let slug = body.title
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  // Ensure slug is unique
  let uniqueSlug = slug;
  let counter = 1;
  while (await Event.findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  const event = await Event.create({ ...body, slug: uniqueSlug });
  return NextResponse.json(event, { status: 201 });
}
