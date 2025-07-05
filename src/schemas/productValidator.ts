import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  inverter: z.boolean(),
  colors: z.array(
    z.object({
      colorName: z.string(),
      hex: z.string(),
      images: z.array(z.string().url()),
      Ton: z.array(
        z.object({
          ton: z.number(),
          stars: z.array(
            z.object({
              star: z.number().min(1).max(5),
              MRP: z.number(),
              sellingPrice: z.number(),
              stock: z.number(),
              tag: z.enum([
                "Popular",
                "Most Selling",
                "Hot",
                "Crazy Deal",
                "Big Saving",
                "Premium",
              ]),
            })
          ),
        })
      ),
    })
  ),
});
