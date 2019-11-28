export interface Roles {
    subscriber?: boolean;
    editor?: boolean;
    admin?: boolean;
 }

export interface User {
    uid: string;
    email: string;
    role:string;
    age:number;
}

export interface Role{
  name:string;
  priviliages:[];
  description:string;
}
