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

export interface ILoggedInUser{
    name: string;
    email: string;
    token: string;
    role: string;
    PurchasedCourses: string[];
    isLoading: boolean;
    isLoggedIn: boolean;
    id: string
}