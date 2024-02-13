import { Router } from "express";
import { createTheatre, getAllTheatres, getTheatreById, deleteTheatre, updateTheatre } from "./controllers/theatreController.ts";

const router = Router();

router.post("/", createTheatre);
router.get('/:id', getTheatreById);
router.get("/", getAllTheatres);
router.put("/:id", updateTheatre);
router.delete("/:id", deleteTheatre);


export default router