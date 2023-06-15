import bodyParser from "body-parser";
import model from "./models/index.js";
import register from "./routes/index.js";
import cors from "cors";
export default class Bootstrap {
    constructor(app) {
        this.app = app;
        this.start();
        this.dbConnection();
        this.route();
    }
    start() {
        const { app } = this;
        const port = app.get("port");
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        const server = app.listen(port, () => {
            console.log("server started ....." + port);
        })
    }

    dbConnection() {
        const { sequelize } = model;
        sequelize?.authenticate().then(result => {
            console.log("database connected..........");
        }).catch(err => {
            console.log(err);
        })
    }

    middleware() {
        const { app } = this;
        
    }

    route() {
        register(this.app);
    }
}