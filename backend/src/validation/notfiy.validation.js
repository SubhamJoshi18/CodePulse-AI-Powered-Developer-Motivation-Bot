import {z} from 'zod'


const notifyCreateSchema = z.object({
    language: z.string().min(2, "Language must be at least 2 characters").max(10, "Language must be at most 10 characters"),
    stopDate: z.coerce.date().refine(date => date > new Date(), {
        message: "Stop date must be a future date"
    }),
    topics: z.array(z.string().min(3, "Each topic must be at least 3 characters")).min(1, "At least one topic is required"),
    questionCountPerData : z.number().min(1,'Question must be At Least 1'),
    time : z.string()
});


export {
    notifyCreateSchema
}