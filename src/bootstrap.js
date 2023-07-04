import bodyParser from 'body-parser';
import models from './models'
import cors from 'cors';
import register from './routes/index.js';
import express from 'express';
export class Bootstrap {
    constructor(app) {
        this.app = app;
        this.connectDB();
        this.middlewares();
        this.routes();
        this.start();
    }

    middlewares() {
        const { app } = this;
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(cors());app.use('/public', express.static(`${__dirname}/../public`));
    }

    connectDB() {
        const { sequelize } = models;
        sequelize.authenticate()
            .then(() => {
                console.log('database connected');
                sequelize.sync()
                    .then(() => {
                        console.log('Database is sync')
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    routes() {
        register(this.app);
     }

    start() {
        this.app.listen(process.env.PORT, () => {
            //console.log('Server Started on 3001');
        })
    }
}