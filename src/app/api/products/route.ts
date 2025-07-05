import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from '@/lib/db';
import ProductModel from '@/models/Product';
import { productSchema } from '@/schemas/productValidator';

// GET: Get all new product
export async function GET(res: NextRequest){
    try {
        await connectDB() ;
        const products = await ProductModel.find({});
        return NextResponse.json({products},{status: 200})
        
    } catch (error:any) {
     console.log('Error in products route');
     return NextResponse.json({ error: error.message }, { status: 500 });
    }
}