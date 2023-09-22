const express = require('express');
const controller = require('./group.controller');
const roomRouter = require('../room/room.routes')
const router = express.Router();

/**
 * Create group
 */
router.put('/create', async (req, res, next) => {
    try {
        console.log(req.body);
        const { name } = req.body;
        await controller.put_group(name);
        res.status(200);
        return res.json({ok: 'ok'});
    } catch (e) {
        res.status(400);
        return res.json({e});
    }
});

/**
 * Get list of groups
 */
router.get('/list', async (req, res, next) => {
    try {
        console.log(req.body);
        const groups = await controller.group_list();
        res.status(200);
        return res.json({groups});
    } catch (e) {
        res.status(400);
    }
});

/**
 * Get a group
 */
router.get('/:id', async (req, res, next) => {
    try {
        console.log(req.params);
        const group = await controller.get_group(req.params.id);
        res.status(200);
        return res.json({group});
    } catch (e) {
        res.status(400);
        return res.json({e});
    }
});

/**
 * Delete a group
 */
router.delete('/:id', async (req, res, next) => {
    try {
        console.log(req.params);
        const group = await controller.delete_group(req.params.id);
        res.status(200);
        return res.json({group});
    } catch (e) {
        res.status(400);
        return res.json({e});
    }
});

router.get('/:id/rooms', async (req, res, next) => {
    try {
        console.log(req.params);
        const room = await controller.get_rooms_in_group(req.params.id, req.params.rooms);
        res.status(200);
        return res.json({room});
    } catch (e) {
        res.status(400);
        return res.json({e});
    }
});

router.post('/:id/rooms/:roomId/users', async (req, res, next) => {
    try {
        console.log(req.params)
        const room = await controller.get_rooms_in_group(req.params.id, req.params.rooms);
        const users = await controller.get_users_in_room(req.params.roomid, req.params.users);

    } catch (e) {
        res.status(400);
        return res.json({e});
    }
    // get room by findbyid
    // get list of users from room
    // add users into room users list
    // findbyid and update on users list
});

router.get('/:id/rooms/:id/chat', async (req, res, next) => {
    try {
        res.status(200);
        return res.json({ok: 'ok'});
    } catch (e) {
        res.status(400);
        return res.json({e});
    }
});

router.get('/:id/rooms/:id/chat', async (req, res, next) => {
    try {
        res.status(200);
        return res.json({ok: 'ok'});
    } catch (e) {
        res.status(400);
        return res.json({e});
    }
});

router.use(':groupId/room', roomRouter);
module.exports = router;
