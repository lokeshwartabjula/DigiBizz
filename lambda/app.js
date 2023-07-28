import express from 'express';
import cors from 'cors';
import rootRoutes from './routes/root.js';

const app = express();

app.use(cors());
app.use(express.json());

// My Routes
app.use('/api', rootRoutes);

const port = 8080;

// Starting a server
app.listen(port, () => {
  console.log(`listening at ${port}`);
});

// export default app;
