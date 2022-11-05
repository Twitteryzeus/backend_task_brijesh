import express, { Express, Request, Response } from 'express';
import { version } from '../package.json';
import { envConfigs } from './config';

const app: Express = express();
const port = envConfigs.port;

app.get('/', (req: Request, res: Response) => {
  res.json({ version });
});

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});