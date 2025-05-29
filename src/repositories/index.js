import { UserReporsitoryMySQL } from "./mysql/user-repository.js";

let userRepository = null;
let persistence = "mysql";

switch (persistence) {
  case "mysql":
    userRepository = UserReporsitoryMySQL;
    break;

  default:
    break;
}

export default { userRepository };
