const express = require('express');
const controller = require('./room.controller');

const router = express.Router();

/**
 * Create a new room
 */
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

/**
 * Get a list of rooms
 */
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

/**
 * Get a room by its ID
 */
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

/**
 * Delete a room by its ID
 */
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

/**
 * Get users in a room
 */
router.get('/:id/users', async (req, res, next) => {
  await controller.get_users_room();
  res.status(200);
  return res.json({ok: 'ok'});
});

/**
 * Add a user to a room
 */
router.put('/:id/add-user', async (req, res, next) => {
  await controller.get_users_room();
  res.status(200);
  return res.json({ok: 'ok'});
});

/**
 * Remove a user from a room
 */
router.delete('/room/:id/remove-user', async (req, res, next) => {
  await controller.delete_user_room();
  res.status(200);
  return res.json({ok: 'ok'});
});

/**
 * Ban a user from a channel and report to superAdmin
 */
router.post('/:roomId/ban-user/:userId/report', async (req, res, next) => {
  try {
    const { roomId, userId } = req.params;
    const adminUserId = req.user.id; // Assuming you have user authentication middleware
    const updatedRoom = await controller.ban_user_from_channel_and_report(roomId, userId, adminUserId);

    if (!updatedRoom) {
      res.status(404).json({ error: 'Room not found' });
    } else {
      res.status(200).json({ message: 'User banned from the channel and incident reported', room: updatedRoom });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
