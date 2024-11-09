import express from 'express';

const router = express.Router();

router.get('/', (_request, response) => {
    const title = "Jrob's site";
    response.setHeader('Content-Type', 'text/html'); // Set content type
    response.send(`<html><head><title>${title}</title></head><body><h1>${title}</h1><p>Hello world!</p></body></html>`);
});

// Renders the login.ejs file
router.get('/login', (req, res) => {
    res.render('login'); 
});

// Renders the register.ejs file
router.get('/register', (req, res) => {
    res.render('register'); 
});

// Renders the lobby.ejs file
router.get('/lobby', (req, res) => {
    res.render('lobby'); 
});

// Renders the game-room.ejs file
router.get('/game-room', (req, res) => {
    res.render('game-room'); 
});

 // Renders the game-over.ejs file
router.get('/game-over', (req, res) => {
    res.render('game-over');
});


export default router;
