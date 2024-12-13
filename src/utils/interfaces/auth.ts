export interface IRegister extends ILogin {
    firstName: string;
    lastName: string;
    phone: number | string;
}

export interface ILogin {
    email: string;
    password: string | number;
}