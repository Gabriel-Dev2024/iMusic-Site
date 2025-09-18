import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send('Rota Stats com o metodo GET');
});

export default router;