// make comment schema
import { z } from "zod";

export const createCommentSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
});
