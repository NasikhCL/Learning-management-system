import {Request } from 'express';
import {IUser} from '../src/db/models';

declare global{
    namespace Express{
        interface Request{
            user?: IUser;
        }
        
    }
}