import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  res.render('LandingPage'); // This renders the LandingPage.ejs view
});



export default router;
