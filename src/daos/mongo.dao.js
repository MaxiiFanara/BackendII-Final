export class MongoDAO {
  constructor(model) {
    this.model = model;
  }

  getAll = async () => {
    try {
      return await this.model.find({});
    } catch (error) {
      throw new Error(`Error al obtener todos los ${this.model.collection.name}: ${error.message}`);
    }
  };

  getById = async (id) => {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(`Error al obtener ${this.model.collection.name} por ID: ${error.message}`);
    }
  };

  create = async (obj) => {
    try {
      return await this.model.create(obj);
    } catch (error) {
      throw new Error(`Error al crear ${this.model.collection.name}: ${error.message}`);
    }
  };

  update = async (id, obj) => {
    try {
      return await this.model.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
      throw new Error(`Error al actualizar ${this.model.collection.name}: ${error.message}`);
    }
  };

  remove = async (id) => {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error al eliminar ${this.model.collection.name}: ${error.message}`);
    }
  };
}