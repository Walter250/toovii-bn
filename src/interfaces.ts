export interface MessageProperties {
  firstname: String;
  lastname: String;
  email: String;
  phone: String;
  message: String;
  isAnswered: Boolean;
}

export enum Permission {
  ADMIN = 'admin',
  USER = 'user',
}
