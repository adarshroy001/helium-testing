import ProductModel from '@/models/Product';
import { connectDB } from "@/lib/db";
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    // Await the params promise
    const { id } = await params;
    
    const product = await ProductModel.findById(id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found from this id' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to fetch product', details: err.message },
      { status: 500 }
    );
  }
}