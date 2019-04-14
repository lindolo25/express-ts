"use strict";

import express = require("express");
import * as bodyParser from "body-parser";
import * as path from "path";
import indexRouter from "./routes/indexRouter";
import logger from "morgan";

/**
 * The server.
 *
 * @class Server
 */
class Server {

    public app: express.Application;

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //configure routes
        this.routes();
    }

    /**
     * Configure routes
     *
     * @class Server
     * @method routes
     * @return void
     */
    private routes() {
        this.app.use(indexRouter);
    }

    /**
     * Configure express server
     *
     * @class Server
     * @method config
     * @return void
     */
    private config() {
        // logger configuration
        this.app.use(logger("dev"));

        // express usefull midelwares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        // public folder
        this.app.use(express.static(path.join(__dirname, "../public")));
    }
}

export = new Server().app;