const express = require("express");
const routes = express.Router();
const multer = require('multer');
const app = express();
const path = require('path');

routes.get("/download", async(req, res) => {
    const file = path.join(__dirname,'Template.xlsx');
    res.download(file, 'Template.xlsx');
})

module.exports = routes;