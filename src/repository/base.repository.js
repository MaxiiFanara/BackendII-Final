export class BaseRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    return await this.dao.getAll();
  };

  getById = async (id) => {
    return await this.dao.getById(id);
  };

  create = async (data) => {
    return await this.dao.create(data);
  };

  update = async (id, data) => {
    return await this.dao.update(id, data);
  };

  delete = async (id) => {
    return await this.dao.remove(id);
  };
}