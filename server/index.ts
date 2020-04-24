import './common/env';
import Server from './common/server';
import routes from './routes';

const port = parseInt(process.env.PORT || "3003");
const server = new Server()
server.router(routes);
const app = server.listen(port);
export default app;

function startGracefulShutdown() {
  console.log('Starting shutdown of express ...');
  server.close();
}

process.on('SIGTERM', startGracefulShutdown);
process.on('SIGINT', startGracefulShutdown);
