import express from "express";
const router = express.Router();

router.get('/main-lobby', (_req, res) => {
  console.log("Rendering main-lobby page");
  res.render('main-lobby');
});


export default router;
