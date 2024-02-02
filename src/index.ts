import mongoose from 'mongoose';
import { app } from './app';
import { ENV, PORT } from './env';

const bootstrap = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://bartciccc:1234@my-first-cluster.9uv4yog.mongodb.net/todos?retryWrites=true&w=majority'
    );
  } catch (err) {
    console.log(`Failed to connect to database, ${err}`);
  }

  app.listen(PORT, () => {
    console.log(`[server]: listening at http://localhost:${PORT} in ${ENV} mode`);
  });
};

bootstrap();
