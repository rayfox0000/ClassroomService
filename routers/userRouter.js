var express = require('express');
var userController = require('./../controllers/userController')
var router = express.Router();

router.post("/register", async function (req, res, next) {
    try {
        var body = req.body || {};
        var [error, result] = await userController.createUser(body);

        error ? res.status(400).json(error) : res.status(204).json(result);
    } catch (e) {
        next(e);
    }

})

router.get("/commonStudents", async function (req, res, next) {
    try {
        var query = req.query || {};
        var [error, result] = await userController.getStudents(query);

        error ? res.status(400).json(error) : res.status(200).json(result);
    } catch (e) {
        next(e);
    }
})

router.post("/suspend", async function (req, res, next) {
    try {
        var body = req.body || {};
        var [error, result] = await userController.suspendUser(body);

        error ? res.status(400).json(error) : res.status(204).json(result);
    } catch (e) {
        next(e);
    }
})

router.post("/retrievefornotations", async function (req, res, next) {
    try {
        var body = req.body || {};
        var [error, result] = await userController.getNotificationStudents(body);

        error ? res.status(400).json(error) : res.status(200).json(result);
    } catch (e) {
        next(e);
    }
})

module.exports = router