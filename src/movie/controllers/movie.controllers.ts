import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const getAllMovies = async (req: Request, res: Response) => {
  const { include } = req.query;
  try {
    const movies = await prisma.movie.findMany({
      where: { isDeleted: false },
      include: {
        show: include === 'shows' && {
          where: { isDeleted: false, datetime: { gte: new Date() } },
          include: {
            screen: true,
            movie: true
          }
        },
      },
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

const getMovieById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: Number(id), isDeleted: false },
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

const createMovie = async (req: Request, res: Response) => {
  const { title, description, duration, rating, genre, director, poster } =
    req.body;
  try {
    const movie = await prisma.movie.create({
      data: { title, description, duration, rating, genre, director, poster },
    });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create movie', error });
  }
};

const updateMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, duration, rating, genre, director, poster } =
    req.body;
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

export { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
