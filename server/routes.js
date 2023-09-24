const express = require('express');
const router = express.Router();
const authRoutes = require('./auth/auth.route');
const userRoutes = require('./user/user.routes');
const groupRoutes = require('./group/group.routes');
const roomRoutes = require('./room/room.routes');

router.use('/user', userRoutes);
router.use('/group', groupRoutes);
router.use('/room', roomRoutes);
router.use('/auth', authRoutes);

module.exports = router;
