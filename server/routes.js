const express = require('express');
const router = express.Router();
const authRoutes = require('./auth/auth.route');
const userRoutes = require('./user/user.routes');
const groupRoutes = require('./group/group.routes');
const roomRoutes = require('./room/room.routes');

router.addRoute = (...args) => {
    router.use(...args);
    if (args[1]) {
        let stri = args[0].substr(1) + ':';
        args[1].stack.map((e) => {
            if (e.route) {
                stri = stri + (' - ' + e.route.path.substr(1));
            }
        });
        console.log('Loaded route:', stri, {detailedLogs: false});
    }
};

router.addRoute('/user', userRoutes);
router.addRoute('/group', groupRoutes);
router.addRoute('/room', roomRoutes);
router.addRoute('/auth', authRoutes);

module.exports = router;
