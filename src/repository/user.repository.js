import { BaseRepository } from './base.repository.js';
import { userDao } from '../daos/user.dao.js';

class UserRepository extends BaseRepository {
  constructor(dao) {
    super(dao);
  }

  getByEmail = async (email) => {
    return await this.dao.getByEmail(email);
  };

  getByEmailWithPassword = async (email) => {
    return await this.dao.getByEmailWithPassword(email);
  };
}

export const userRepository = new UserRepository(userDao);