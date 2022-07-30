import { PhoneModel } from "./phone.model";

export class UserModel {

  name!: string;
  email!: string;
  password!: string;
  phones!: PhoneModel[];
}
