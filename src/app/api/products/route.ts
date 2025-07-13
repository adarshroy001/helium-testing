// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ProductModel from '@/models/Product';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;
    
    // Get products with pagination
    const products = await ProductModel.find({})
      .select('name description inverter colors.colorName colors.hex colors.images colors.Ton')
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Get total count for pagination
    const total = await ProductModel.countDocuments();
    
    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (error: any) {
    console.error('Error in GET /api/products:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
