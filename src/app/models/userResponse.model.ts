export class userResponseModel{

  id!: string;
  name!: string;
  email!: string;
  password!: string;
  phones!: [
    {
      id: number;
      number: string;
      citycode: string;
      countrycode: string;
    }
  ];
  created!: string;
  modified!: string;
  last_login?: String;
  isactive!: boolean;
}
