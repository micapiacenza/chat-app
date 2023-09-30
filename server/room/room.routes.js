const express = require('express');
const controller = require('./room.controller');

const router = express.Router();

/**
 * Create a new room
 */
router.post('/create/:groupId', async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { name, users } = req.body;
    // Create the room with the specified groupId, name, and initial users
    const createdRoom = await controller.put_room(name, groupId, users);
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

module.exports = router;
