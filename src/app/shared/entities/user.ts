
export interface User {
    uid: string;
    email: string;
    role:string;
}

export interface Role{
  name:string;
  priviliages:[];
  description:string;
}
