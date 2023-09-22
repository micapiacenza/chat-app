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

/**
 * Get rooms in a group
 */
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

/**
 * Add users to a room in a group
 */
router.post('/:id/rooms/:roomId/users', async (req, res, next) => {
  try {
    const { id, roomId, users } = req.params;

    // Fetch the room by ID
    const room = await controller.get_rooms_in_group(id, roomId);

    if (!room) {
      res.status(404).json({ error: 'Room not found' });
      return;
    }

    // Fetch the list of users from the room
    const roomUsers = room.users;

    // Add the specified users to the room's user list
    for (const userId of users) {
      // Check if the user is already in the room's user list
      if (!roomUsers.includes(userId)) {
        roomUsers.push(userId);
      }
    }

    // Update the room with the modified user list
    const updatedRoom = await controller.get_rooms_in_group(id, roomId, roomUsers);

    res.status(200).json({ message: 'Users added to the room', room: updatedRoom });
  } catch (e) {
    // Handle errors while adding users to a room
    res.status(400).json({ error: 'An error occurred' });
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

/**
 * Promote user to group admin
 */
router.post('/promote/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const promotedUser = await controller.promote_user_to_GroupAdmin(userId);

    if (!promotedUser) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json({ message: 'User promoted to Group Admin', user: promotedUser });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.use(':groupId/room', roomRouter);
module.exports = router;
