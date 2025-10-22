import { readFileSync } from 'node:fs';
import { createServer as createHttpServer } from 'node:http';
import { createServer as createHttpsServer } from 'node:https';
import next from 'next';

const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = parseInt(process.env.PORT || '3001', 10);
const dev = process.env.NODE_ENV !== 'production';
const useHttps = process.env.HTTPS === 'true';

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const logReady = (protocol) => {
  console.log(`> Ready on ${protocol}://${hostname}:${port}`);
};

const startServer = async () => {
  try {
    await app.prepare();

    if (useHttps) {
      const keyPath = process.env.SSL_KEY_PATH;
      const certPath = process.env.SSL_CERT_PATH;

      if (!keyPath || !certPath) {
        console.error('HTTPS=true but SSL_KEY_PATH or SSL_CERT_PATH is missing.');
        process.exit(1);
      }

      const httpsOptions = {
        key: readFileSync(keyPath),
        cert: readFileSync(certPath)
      };

      const caPath = process.env.SSL_CA_PATH;
      if (caPath) {
        httpsOptions.ca = readFileSync(caPath);
      }

      createHttpsServer(httpsOptions, (req, res) => handle(req, res)).listen(
        port,
        hostname,
        () => logReady('https')
      );
      return;
    }

    createHttpServer((req, res) => handle(req, res)).listen(port, hostname, () =>
      logReady('http')
    );
  } catch (error) {
    console.error('Failed to start the Next.js server.', error);
    process.exit(1);
  }
};

startServer();
