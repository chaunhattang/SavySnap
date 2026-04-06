import { NextResponse } from 'next/server';
import { snaps } from '../data';

type Params = {
    params: Promise<{
        id: string;
    }>;
};

export async function DELETE(req: Request, { params }: Params) {
    const { id } = await params;

    console.log('DELETE ID:', id);

    const index = snaps.findIndex((s) => s.id === id);

    if (index !== -1) {
        snaps.splice(index, 1);
    }

    return NextResponse.json({
        success: true,
    });
}

export async function PUT(req: Request, { params }: Params) {
    const { id } = await params;

    console.log('UPDATE ID:', id);

    const body = await req.json();

    const snap = snaps.find((s) => s.id === id);

    if (snap) {
        if (body.title !== undefined) {
            snap.title = body.title;
        }

        if (body.amount !== undefined) {
            snap.amount = body.amount;
        }

        if (body.category !== undefined) {
            snap.category = body.category;
        }

        if (body.type !== undefined) {
            snap.type = body.type;
        }

        if (body.image !== undefined) {
            snap.image = body.image;
        }
    }

    return NextResponse.json({
        success: true,
    });
}
