import MySqlRepository from "./mysql-repository.js";
import { UserModel } from "../../models/user-model.js";

class UserReporsitory extends MySqlRepository {
  constructor() {
    super(UserModel);
  }
}

export const UserReporsitoryMySQL = new UserReporsitory();
