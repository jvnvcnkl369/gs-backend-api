import { Request, Response } from "express";
import { UserService } from "../services/UserService.js";

export const register = async (req: Request, res: Response) => {
  try {
    await UserService.validateRegisterPayload(req);
    const data = await UserService.createUser(req);
    res.status(201).json({ data, message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

export const login = async (req: Request, res: Response) => {

  try {
    const token = await UserService.loginUser(req);
    res.status(200).json({ token });
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message});
  }
 
};
