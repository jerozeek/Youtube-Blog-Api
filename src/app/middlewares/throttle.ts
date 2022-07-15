import rateLimiter from 'express-rate-limit';

export const throttle = (limit: number, timeFrameInMinutes: number) => {
    return rateLimiter({
        windowMs: timeFrameInMinutes * 60 * 1000,
        max: limit,
        message: {
            error: {
                status: 429,
                message: 'Too many requests, please try again later.',
            }
        }
    });
}

