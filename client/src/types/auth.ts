export interface IUserLogin{
    email: string;
    password: string;
}

export interface IUserSignup{
    name: string;
    email: string;
    password: string;
}

export interface IVerificationCode{
    code: string;
    token: string;
}