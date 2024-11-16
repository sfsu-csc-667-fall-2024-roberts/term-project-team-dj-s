import express from 'express';

const router = express.Router();

router.get('/', (_request, response) => {
    const title = "Jrob's site";
    response.setHeader('Content-Type', 'text/html'); // Set content type
    response.send(`<html><head><title>${title}</title></head><body><h1>${title}</h1><p>Hello world!</p></body></html>`);
});

export default router;
