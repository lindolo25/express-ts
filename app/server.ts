#!/usr/bin/env node
"use strict";

//module dependencies.
import app from "./app";
import http from "http";
import dotEnv from "dotenv";
import { AddressInfo } from "net";
let debug = require("debug")("express:server");

// configure environment.
dotEnv.config();

//get port from environment and store in Express.
let port: any = normalizePort(process.env.PORT || 3000);
app.set("port", port);

//create http server
let server: http.Server = http.createServer(app);

//listen on provided ports
server.listen(port);

//add error handler
server.on("error", onError);

//start listening on port
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: any) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
    if (error.syscall !== "listen") {
        throw error;
    }

    let bind: string = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/*
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    let addr: any = server.address();
    let bind: string = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    debug("Listening on " + bind);
}