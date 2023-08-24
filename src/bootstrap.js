import bodyParser from 'body-parser';
import models from './models'
import cors from 'cors';
import register from './routes/index.js';
import express from 'express';
import logger from './services/logger';
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
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors()); app.use('/public', express.static(`${__dirname}/../public`));
    }

    connectDB() {
        const { sequelize } = models;
        sequelize.authenticate()
            .then(() => {
                logger.dailyLogger('dbStatus').error('Database connected successfully');
                // console.log('database connected');
                sequelize
                    .sync()
                    .then(() => {
                        logger.dailyLogger('dbStatus').info('Database sync successfully');
                        // console.log('Database is sync')
                    })
                    .catch(err => {
                        console.log(err);
                        logger
                            .dailyLogger('dbStatus')
                            .error(new Error(`Database syncing error ${error}`));
                    })
            })
            .catch(err => {
                logger
                    .dailyLogger('dbStatus')
                    .error(new Error(`Database connection error ${error}`));
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