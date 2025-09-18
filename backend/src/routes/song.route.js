import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send('Rota Song com o metodo GET');
});

export default router;