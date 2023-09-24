const express = require('express');
const controller = require('./user.controller');

const router = express.Router();

/**
 * Create user
 */
router.put('/create', async (req, res, next) => {
    try {
        console.log(req.body);
        const {
            email,
            username,
            role,
            pwd,
        } = req.body;
        await controller.put_user(email, username, role, pwd);
        res.status(200);
        return res.json({ok: 'ok'});
    } catch (e) {
        res.status(400);
        return res.json({e});
    }
});

/**
 * Get list of users
 */
router.get('/list', async (req, res, next) => {
    try {
        console.log(req.body);
        const users = await controller.list_users();
        res.status(200);
        return res.json({users});
    } catch (e) {
        res.status(400);
        return res.json({e});
    }
});

/**
 * Get a user by id
 */
router.get('/:id', async (req, res, next) => {
    try {
        console.log(req.params);
        const user = await controller.get_user(req.params.id);
        res.status(200);
        return res.json({user});
    } catch (e) {
        res.status(400);
        return res.json({e});
    }
});

/**
 * Delete a user by id
 */
router.delete('/:id', async (req, res, next) => {
    try {
        console.log(req.params);
        const user = await controller.delete_user(req.params.id);
        res.status(200);
        return res.json({user});
    } catch (e) {
        res.status(400);
        return res.json({e});
    }
});

/**
 * Assign role to user
 */
router.post('/:id/assign/:roleType', async (req, res, next) => {
    try {
        const {id, roleType} = req.params;
        const user =  await controller.assign_role_to_user(id,roleType);
        res.status(200);
        return res.json({user});
    } catch (e) {
        res.status(400);
        return res.json({e});
    }
});


module.exports = router;
