import 'dotenv/config';
import express from 'express';
import mongooseConnection from './db/connection';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();

app.use(express())
app.use(cookieParser());
app.use(bodyParser.json());



app.use(cors({
    credentials:true,
}))

const port = process.env.PORT;

mongooseConnection();
    
    app.listen(port, () => {
      
        console.log('server is running at port: ',port )
    })


