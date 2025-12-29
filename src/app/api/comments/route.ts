import dbConnect from '@/lib/db';
import Comment from '@/models/Comment';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventId, author, content } = body;

    if (!eventId || !author || !content) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
    }

    await dbConnect();
    const comment = await Comment.create({ eventId, author, content });
    
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de l\'ajout du commentaire' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get('eventId');
  const all = searchParams.get('all'); // If true, return all comments (even hidden ones) for admin

  if (!eventId) {
    return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
  }

  await dbConnect();
  
  const query: any = { eventId };
  
  // If not asking for all (admin), only show visible ones
  if (all !== 'true') {
    query.isVisible = true;
  }

  const comments = await Comment.find(query).sort({ createdAt: -1 });
  return NextResponse.json(comments);
}
