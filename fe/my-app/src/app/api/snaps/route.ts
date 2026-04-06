import { NextResponse } from 'next/server';
import { snaps } from './data';

export async function GET() {
    return NextResponse.json(snaps);
}

export async function POST(req: Request) {
    const formData = await req.formData();

    const title = formData.get('title');
    const amount = formData.get('amount');
    const type = formData.get('type');
    const category = formData.get('category');

    // nhận string URL từ frontend
    const image = formData.get('image');

    const newSnap = {
        id: Date.now().toString(),
        title,
        amount,
        type,
        category,
        image,
        createdAt: new Date().toISOString(),
    };

    snaps.push(newSnap);

    return NextResponse.json(newSnap);
}
