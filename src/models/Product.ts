//api/models/product.ts
import { Schema, model, models, Document } from 'mongoose';
import { Product, Star, Tonnage, Colors } from '@/types/Product';


//
// ---------- Sub-Schema: Star ----------
const starSchema = new Schema<Star>(
    {
        star: {type: Number,required: true,enum: [1, 2, 3, 4, 5],max: 5},
        MRP: { type: Number, required: true},
        sellingPrice: {type: Number,required: true},
        stock: {type: Number,required: true},
        tag: {type: String,trim: true,enum: ['Popular', 'Most Selling', 'Hot', 'Crazy Deal', 'Big Saving', 'Premium'],},
    },
    { _id: false }
);

//
// ---------- Sub-Schema: Tonnage ----------
const tonnageSchema = new Schema<Tonnage>(
    {
        ton: {type: Number,required: true},
        stars: {type: [starSchema],required: true},
    },
    { _id: false }
);

//
// ---------- Sub-Schema: Colors ----------
const colorsSchema = new Schema<Colors>(
    {
        colorName: {type: String,required: true,trim: true},
        hex: {type: String,required: true,trim: true},
        images: [{type: String,required: true}],
        Ton: {type: [tonnageSchema],required: true},
    },
    { _id: false }
);

//
// ---------- Main Product Schema ----------
//
const productSchema = new Schema<Product & Document>(
    {
        name: { type: String, required: true, unique: true, trim: true },
        description: { type: String, trim: true },
        inverter: { type: Boolean, required: true, default: true },
        colors: { type: [colorsSchema], required: true },
    },
    { timestamps: true }
);

const ProductModel = models.Product || model('Product', productSchema);
export default ProductModel;