import ExpressServer from './server/expres-server';

const HOST: string = process.env.HOST || 'localhost';
const PORT: number = Number(process.env.POR) || 3000;

const server = new ExpressServer(HOST, PORT);

try {
  server.listen();
} catch (error) {
  console.error(error);
}