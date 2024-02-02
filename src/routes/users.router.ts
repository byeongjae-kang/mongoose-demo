import { Router } from 'express';
import { User } from '../models/user';

export const router = Router();

router.get('/', async (req, res) => {
  const users = await User.find().lean().exec();

  res.json(users);
});

router.post('/', async (req, res) => {
  const newUser = await User.build({ email: 'bart@gmail.ca', password: '1234' });

  res.json(newUser);
});

router.put('/:id', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body).lean().exec();

  res.json(updatedUser);
});

router.delete('/:id', async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id).lean().exec();

  res.json(deletedUser);
});
