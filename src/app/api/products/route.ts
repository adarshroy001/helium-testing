// api/products/routes.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ProductModel from '@/models/Product';

// GET: Get all products
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const products = await ProductModel.find({});
    return NextResponse.json({ products }, { status: 200 });
  } catch (error: any) {
    console.error('Error in GET /api/products:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}