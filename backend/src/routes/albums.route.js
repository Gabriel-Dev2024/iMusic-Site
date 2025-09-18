import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send('Rota Albums com o metodo GET');
});

export default router;