"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookValidation = void 0;
const zod_1 = require("zod");
const bookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        author: zod_1.z.string(),
        thumbnail: zod_1.z.string(),
        genre: zod_1.z.string(),
        publicationYear: zod_1.z.string(),
        reviews: zod_1.z.array(zod_1.z.object({
        // Define the properties of the reviews here, if needed
        })).optional(),
    })
});
exports.bookValidation = {
    bookZodSchema,
};
