import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import ProductModel from '@/models/Product';
import { connectDB } from '@/lib/db';
import os from 'os';



export const config = {
    api: {
        bodyParser: false,
    },
};
// POST: Create a new product
export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const productData = formData.get('data') as string;
        if (!productData) {
            return NextResponse.json({ error: 'Data field is required' }, { status: 400 });
        }

        const parsed = JSON.parse(productData);
        const colors = parsed.colors;

        if (!Array.isArray(colors)) {
            return NextResponse.json({ error: 'Colors must be an array' }, { status: 400 });
        }

        // Iterate each color index
        for (let i = 0; i < colors.length; i++) {
            const images: File[] = formData.getAll(`images_${i}`) as File[];
            const imageUrls: string[] = [];

            for (const file of images) {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const tmpFilename = `${uuidv4()}.webp`;
                const tmpPath = path.join(os.tmpdir(), tmpFilename);

                await writeFile(tmpPath, buffer);

                const uploadRes = await cloudinary.uploader.upload(tmpPath, {
                    folder: 'helium-products',
                });

                imageUrls.push(uploadRes.secure_url);
            }

            // Inject image URLs into that color
            colors[i].images = imageUrls;
        }

        await connectDB();
        const newProduct = await ProductModel.create(parsed);

        return NextResponse.json({ message: 'Product created with multiple images', product: newProduct }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Upload failed', details: error.message }, { status: 500 });
    }
}
