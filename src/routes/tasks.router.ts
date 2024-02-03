import { Request, Response, Router } from 'express';
import { Task } from '../models/task';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const tasks = await Task.find().populate('createdBy').lean().exec();

  res.json(tasks);
});

// ******
router.get('/:id', async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id).populateAll();

  res.json(task);
});

// **********
router.post('/', async (req: Request, res: Response) => {
  const task = await Task.create({
    task: 'my first task',
    createdBy: '65bc21953ea018c9636defcd',
    categories: ['65bd6503bd57442a3ed3f821', '65bd65885fb45fe7b497b443', '65bd65b24bc1e015487a17f2']
  });

  res.json(task);
});

router.put('/:id', async (req: Request, res: Response) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    upsert: true
  });
  res.json(updated);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const deleted = await Task.findByIdAndDelete(req.params.id);

  res.json(deleted);
});
