import { Router } from "express";
import { getAllShows, createShow } from './controllers/show.controllers';

const router = Router();

router.post("/", createShow);
// router.get('/:id', getShowById);
router.get("/", getAllShows);
// router.put("/:id", updateShow);
// router.delete("/:id", deleteShow);


export default router