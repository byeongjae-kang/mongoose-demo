import { Router } from 'express';
import { Category } from '../models/catetory';

export const router = Router();

router.post('/', async (req, res) => {
  const category = await Category.create({ name: 'Category5' });
  res.json(category);
});
