import { ObjectId } from 'mongodb';
import { getDB } from '../../config/mongodb.js';
import ApplicationError from '../../errorHandler/applicationError.js';

class ProductRepository {
  constructor() {
    this.collection = 'products';
  }

  async add(newProduct) {
    try {
      // 1. Get the DB
      const db = getDB();
      const collection = db.collection(this.collection);
      collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      console.log(err);
      throw new ApplicationError('Something went wrong with database', 500);
    }
  }

  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find().toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError('Something went wrong with database', 500);
    }
  }

  async get(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.log(err);
      throw new ApplicationError('Something went wrong with database', 500);
    }
  }
}

export default ProductRepository;
