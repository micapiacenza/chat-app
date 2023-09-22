const express = require('express');
const controller = require('./auth.controller');

const router = express.Router();

router.put('/', async (req, res, next) => {
    await controller.put_auth();
    res.status(200);
    return res.json({ok: 'ok'});
})

module.exports = router;
