export interface IRegister extends ILogin {
    firstName: string;
    lastName: string;
    phone: string;
}

export interface ILogin {
    email: string;
    password: string | number;
}

export interface IUser {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    photoUrl: string;
    role: number;
    address?: string;
}
