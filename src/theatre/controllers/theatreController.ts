import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const getAllTheatres = async (req: Request, res: Response) => {
  const { include } = req.query;
  try {
    const theatres = await prisma.theatre.findMany({
      where: { isDeleted: false },
      include: {
        Screen: include === 'screens' ? true : false,
      },
    });
    res.json(theatres);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch theatres' });
  }
};

const getTheatreById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const theatre = await prisma.theatre.findUnique({
      where: { id: Number(id), isDeleted: false },
    });
    if (!theatre) {
      res.status(404).json({ error: 'Theatre not found' });
    } else {
      res.json(theatre);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch theatre' });
  }
};

const createTheatre = async (req: Request, res: Response) => {
  const { name, address, website, phone, lat, lng } = req.body;
  try {
    const theatre = await prisma.theatre.create({
      data: { name, address, website, phone, lat, lng },
    });
    res.json(theatre);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create theatre' });
  }
};

const updateTheatre = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, address, website, phone, lat, lng } = req.body;
  try {
    const theatre = await prisma.theatre.update({
      where: { id: Number(id) },
      data: { name, address, website, phone, lat, lng },
    });
    res.json(theatre);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update theatre' });
  }
};

const deleteTheatre = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const theatre = await prisma.theatre.update({
      where: { id: Number(id) },
      data: { isDeleted: true },
    });
    res.json(theatre);
  } catch (error) {
    res.status(500).json({ error: 'Failed to soft delete theatre' });
  }
};

export {
  getAllTheatres,
  getTheatreById,
  createTheatre,
  updateTheatre,
  deleteTheatre,
};
