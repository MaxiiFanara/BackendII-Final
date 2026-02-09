import { BaseRepository } from './base.repository.js';
import { ticketDao } from '../daos/ticket.dao.js';

class TicketRepository extends BaseRepository {
  constructor(dao) {
    super(dao);
  }

  getByPurchaser = async (email) => {
    return await this.dao.getByPurchaser(email);
  };

  getByUser = async (userId) => {
    return await this.dao.getByUser(userId);
  };

  existsByCode = async (code) => {
    return await this.dao.existsByCode(code);
  };
}

export const ticketRepository = new TicketRepository(ticketDao);