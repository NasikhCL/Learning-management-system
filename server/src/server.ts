import 'dotenv/config';
import express from 'express';
import mongooseConnection from './db/connection';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

app.use(express())
app.use(cookieParser());
app.use(bodyParser.json());



app.use(cors({
    credentials:true,
}))

app.use('/', routes)
app.get('/test', (req, res)=>{
    res.status(200).json({
        success: true,
        message: 'API working'
    });
});

app.all('*', (req, res, next)=>{
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err)

});

const port = process.env.PORT || '5500';


app.listen(port, () => {
    console.log(`server is running at port: ${port}`)
    mongooseConnection();

});