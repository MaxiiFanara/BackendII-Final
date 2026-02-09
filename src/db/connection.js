import { connect } from "mongoose";
import { env } from "../config/env.config.js";

export class ConnectMongoDB {
  static #instance;

  #connectDB = async () => {
    try {
      await connect(env.mongoUrl);
      console.info("✅ Base de datos conectada");
    } catch (error) {
      console.error("❌ Error al conectar a la base de datos:", error.message);
      process.exit(1);
    }
  };

  static async getInstance() {
    if (!this.#instance) {
      this.#instance = new ConnectMongoDB();
      await this.#instance.#connectDB();
    }
    return this.#instance;
  }
}
