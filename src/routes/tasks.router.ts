import { Request, Response, Router } from 'express';
import { Types } from 'mongoose';
import { Task } from '../models/task';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const tasks = await Task.find().populate('createdBy').lean().exec();

  res.json(tasks);
});

router.get('/:id', async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id).populate('createdBy').lean().exec();

  res.json(task);
});

router.post('/', async (req: Request, res: Response) => {
  const isValidId = Types.ObjectId.isValid('65bc21953ea018c9636defcd');
  const id = isValidId ? '65bc21953ea018c9636defcd' : new Types.ObjectId();

  const task = await Task.create({
    task: 'my first task',
    createdBy: id
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
