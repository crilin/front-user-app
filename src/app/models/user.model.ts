export class UserModel {

  name!: string;
  email!: string;
  password!: string;
  phones!: [
    {
      id: 0;
      number: string;
      citycode: string;
      countrycode: string;
    }
  ];
}
