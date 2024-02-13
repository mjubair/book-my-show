import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const getAllScreens = async (req: Request, res: Response) => {
  try {
    const screens = await prisma.screen.findMany({
      where: { isDeleted: false },
    });
    res.json(screens);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch screens' });
  }
};

const getScreenById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const screen = await prisma.screen.findUnique({
      where: { id: Number(id), isDeleted: false },
    });
    if (!screen) {
      res.status(404).json({ error: 'Screen not found' });
    } else {
      res.json(screen);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch screen' });
  }
};

const createScreen = async (req: Request, res: Response) => {
  const { theatreId, seatCount, seatConfiguration } = req.body;
  try {
    const screen = await prisma.screen.create({
      data: { theatreId, seatCount, seatConfiguration },
    });
    res.json(screen);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create screen', error });
  }


};

// const updateMovie = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { title, description, duration, rating, genre, director, poster } =
//     req.body;
//   try {
//     const movie = await prisma.movie.update({
//       where: { id: Number(id) },
//       data: { title, description, duration, rating, genre, director, poster },
//     });
//     res.json(movie);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update movie' });
//   }
// };

const deleteScreen = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const screen = await prisma.screen.update({
      where: { id: Number(id) },
      data: { isDeleted: true },
    });
    res.json(screen);
  } catch (error) {
    res.status(500).json({ error: 'Failed to soft delete screen' });
  }
};

export { getAllScreens, getScreenById, createScreen, deleteScreen };
