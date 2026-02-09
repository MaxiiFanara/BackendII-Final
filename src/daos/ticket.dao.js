import { MongoDAO } from "./mongo.dao.js";
import { ticketModel } from "../models/ticket.model.js";

class TicketDaoMongo extends MongoDAO {
  constructor() {
    super(ticketModel);
  }

  getByPurchaser = async (email) => {
    try {
      return await this.model
        .find({ purchaser: email })
        .sort({ purchase_datetime: -1 })
        .populate('user', 'first_name last_name email')
        .populate('products.product', 'title');
    } catch (error) {
      throw new Error(`Error al obtener tickets del usuario: ${error.message}`);
    }
  };

  getByUser = async (userId) => {
    try {
      return await this.model
        .find({ user: userId })
        .sort({ purchase_datetime: -1 })
        .populate('user', 'first_name last_name email')
        .populate('products.product', 'title');
    } catch (error) {
      throw new Error(`Error al obtener tickets del usuario: ${error.message}`);
    }
  };

  existsByCode = async (code) => {
    try {
      const ticket = await this.model.findOne({ code });
      return !!ticket;
    } catch (error) {
      throw new Error(`Error al verificar código de ticket: ${error.message}`);
    }
  };
}

export const ticketDao = new TicketDaoMongo();