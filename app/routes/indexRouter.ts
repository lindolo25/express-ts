import express = require("express");
import * as indexRoute from "../controllers/indexController";

//get router
let router: express.Router = express.Router();

//create routes
var index: indexRoute.Index = new indexRoute.Index();

//home page
router.get("/", index.index.bind(index.index));

//Export router
export = router;