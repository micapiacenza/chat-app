const express = require('express');
const controller = require('./room.controller');

const router = express.Router();

/**
 * Create a new room
 */
router.post('/create/:groupId', async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { name } = req.body;
    // Create the room with the specified groupId and name
    const createdRoom = await controller.put_room(name, groupId);
    res.status(200).json({ message: 'Room created successfully', room: createdRoom });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
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
  try {
    const roomId = req.params.id;
    const users = await controller.get_users_room(roomId);
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

/**
 * Add a user to a room
 */
router.put('/:id/add-user', async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const { userIds } = req.body;
    const updatedRoom = await controller.add_users_to_room(roomId, userIds);

    if (!updatedRoom) {
      res.status(404).json({ error: 'Room not found' });
    } else {
      res.status(200).json({ message: 'Users added to the room', room: updatedRoom });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = router;
