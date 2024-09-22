import { Request } from "express";
import { isValidEmail} from "../helpers/helpers.js";
import { AppDataSource } from "../data-source.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ErrorWithStatus } from "../errors/ErrorWithStatus.js";

export class UserService {
  static async createUser(req: Request) {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      email,
      password: hashedPassword,
    });


    await userRepository.save(newUser);
    const token = jwt.sign({ user: {email, id: newUser.id} }, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });
    return { token, id: newUser.id, email: newUser.email };
  }
  static async loginUser(req: Request) {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = req.body;

    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      throw new ErrorWithStatus(404, "User not found.");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new ErrorWithStatus(401, "Invalid credentials.");
    }

    const token = jwt.sign({ user: {email, id: user.id} }, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });

    return { token };
  }

  static async validateRegisterPayload(req: Request): Promise<void | Error> {
    const { email, password, passwordConfirmation } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    if (!isValidEmail(email)) {
      throw new Error("Email is not valid");
    }

    if (password.length <= 8) {
      throw new Error("Password is too short");
    }

    if (!email || !password || !passwordConfirmation) {
      throw new Error("Some of the required fields are missing");
    }

    if (password !== passwordConfirmation) {
      throw new Error("Passwords do not match.");
    }

    if (await userRepository.findOne({ where: { email } })) {
      throw new Error("User with this email already exists");
    }
  }
}
