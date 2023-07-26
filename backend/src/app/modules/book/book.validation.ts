import { z } from "zod";

const bookZodSchema = z.object({
    body: z.object({
        title: z.string(),
        author: z.string(),
        thumbnail: z.string(),
        price: z.string(),
        rating: z.string(),
      //   featured: z.boolean(),
        genre: z.string(),
        publicationYear: z.string(),
        reviews: z.array(z.object({
          // Define the properties of the reviews here, if needed
        })).optional(),
        wishlist: z.array(z.string()).optional(),
        readingList: z.array(z.string()).optional(),
        finishedList: z.array(z.string()).optional(),
    })
});


export const bookValidation = {
    bookZodSchema,
};