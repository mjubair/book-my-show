import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const getAllShows = async (req: Request, res: Response) => {
  try {
    const shows = await prisma.show.findMany({
      where: { isDeleted: false },
    });
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shows' });
  }
};

const getMovieById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: Number(id), isDeleted: false},
    });
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
    } else {
      res.json(movie);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
};

const createShow = async (req: Request, res: Response) => {
  console.log(req.body)
  const { datetime, screenId, movieId } = req.body;
  try {
    const show = await prisma.show.create({
      data: { datetime, screenId, movieId },
    });
    res.json(show);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create show', error });
  }
};

const updateMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, duration, rating, genre, director, poster } = req.body;
  try {
    const movie = await prisma.movie.update({
      where: { id: Number(id) },
      data: { title, description, duration, rating, genre, director, poster },
    });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update movie' });
  }
};

const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movie.update({
      where: { id: Number(id) },
      data: { isDeleted: true },
    });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to soft delete movie' });
  }
};

export { getAllShows, getMovieById, createShow, updateMovie, deleteMovie };
  
  
