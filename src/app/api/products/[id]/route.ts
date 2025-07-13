// app/api/products/[id]/route.ts
import ProductModel from '@/models/Product';
import { connectDB } from "@/lib/db";
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    const product = await ProductModel.findById(id).lean();
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product, {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to fetch product', details: err.message },
      { status: 500 }
    );
  }
}
