const express = require('express');
const controller = require('./room.controller');

const router = express.Router();

router.put('/create', async (req, res, next) => {
    try {
        console.log(req.body);
        const { name } = req.body;
        await controller.put_room(name);
        res.status(200);
        return res.json({ok: 'ok'});
    } catch (e) {
        res.status(400);
        return res.json({e});
    }
});

router.get('/list', async (req, res, next) => {
    try {
        console.log(req.body);
        const rooms = await controller.list_rooms();
        res.status(200);
        return res.json({rooms});
    } catch (e) {
        res.status(400);
        return res.json({e});
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        console.log(req.params);
        const room = await controller.get_room(req.params.id);
        res.status(200);
        return res.json({room});
    } catch (e) {
        res.status(400);
        return res.json({e});
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        console.log(req.params);
        const room = await controller.delete_room(req.params.id);
        res.status(200);
        return res.json({room});
    } catch (e) {
        res.status(400);
        return res.json({e});
    }
});

router.get('/:is/users', async (req, res, next) => {
    await controller.get_users_room();
    res.status(200);
    return res.json({ok: 'ok'});
});

router.put('/:id/add-user', async (req, res, next) => {
    await controller.get_users_room();
    res.status(200);
    return res.json({ok: 'ok'});
});

router.delete('/room/:id/remove-user', async (req, res, next) => {
    await controller.delete_user_room();
    res.status(200);
    return res.json({ok: 'ok'});
})

module.exports = router;
