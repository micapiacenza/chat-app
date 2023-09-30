const express = require("express");
const controller = require('./message.controller');
const router = express.Router();

/**
 * Create a new message in a room
 */
router.post('/:roomId/messages', async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const { senderId, content } = req.body;

    const messages = await controller.addMessageToRoom(
      roomId,
      senderId,
      content
    );

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

/**
 * Get messages for a room
 */
router.get('/:roomId/messages', async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const messages = await controller.getRoomMessages(roomId);

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});
