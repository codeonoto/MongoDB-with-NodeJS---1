import UserModel from './user.model.js';
import jwt from 'jsonwebtoken';
import UserRepository from './user.repository.js';

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    const { name, email, password, type } = req.body;
    const user = new UserModel(name, email, password, type);
    await this.userRepository.signUp(user);
    res.status(201).send(user);
  }

  async signIn(req, res, next) {
    try {
      const result = await this.userRepository.signIn(
        req.body.email,
        req.body.password
      );
      if (!result) {
        return res.status(400).send('Incorrect Credentials');
      } else {
        // 1. Create Token.
        const token = jwt.sign(
          { userID: result.id, email: result.email },
          'rW3ubt5ww6a8frcfxQLEAnvi1NhBWtd8',
          {
            expiresIn: '1h',
          }
        );
        // 2. Send Token
        return res.status(200).send(token);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send('Something went wrong');
    }
  }
}
