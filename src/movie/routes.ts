import { Router } from "express";
import {
  createMovie,
  getAllMovies,
  getMovieById,
  deleteMovie,
  updateMovie,
} from './controllers/movie.controllers';

const router = Router();

router.post("/", createMovie);
router.get('/:id', getMovieById);
router.get('/', getAllMovies);
router.put('/:id', updateMovie);
router.delete("/:id", deleteMovie);


export default router