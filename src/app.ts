import express, { Request, Response } from 'express';
import { router as usersRouter } from './routes/users.router';

export const app = express();

app.use(express.json());
app.use('/users', usersRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ error: `Not Found Route - ${req.method} ${req.path}` });
});
