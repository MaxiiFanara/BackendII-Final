import { MongoDAO } from "./mongo.dao.js";
import { userModel } from "../models/user.model.js";

class UserDaoMongo extends MongoDAO {
  constructor() {
    super(userModel);
  }

  getByEmail = async (email) => {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(`Error al obtener usuario por email: ${error.message}`);
    }
  };

  getByEmailWithPassword = async (email) => {
    try {
      return await this.model.findOne({ email }).select('+password');
    } catch (error) {
      throw new Error(`Error al obtener usuario con password: ${error.message}`);
    }
  };
}

export const userDao = new UserDaoMongo();