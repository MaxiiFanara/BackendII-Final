import app from './app.js';
import { env } from './config/env.config.js';
import { ConnectMongoDB } from './db/connection.js';

const startServer = async () => {
  try {
    await ConnectMongoDB.getInstance();

    app.listen(env.port, () => {
      console.log(` Server running on port ${env.port}`);
      console.log(` Environment: ${env.nodeEnv}`)
    });

  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();