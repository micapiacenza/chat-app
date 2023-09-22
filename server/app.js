const express = require('express');
const morgan = require('morgan');
const {connect} = require('mongoose'); // Object Document Mapping lib
// const routes = require('./user/user.routes');

const bodyParser = require('body-parser')
// Express app
const app = express();
const cors = require('cors');

// Connect to mongo db
const dbURI = 'mongodb+srv://micapiacenza:qwerty123@lets-chat.s5mizeo.mongodb.net/letschatdb?retryWrites=true&w=majority';
// mongoose.connect(dbURI).then((result) => app.listen(3000)).catch((err) => console.log(err));

try {
    connect(dbURI, {useNewUrlParser: true}, () => {
        console.log('mongoose connected');
        app.listen(3000);

// middleware & static files
        app.use(express.static('public'));
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        // Set up CORS
        app.use(cors({
            origin: true, // "true" will copy the domain of the request back
                          // to the reply. If you need more control than this
                          // use a function.

            credentials: true, // This MUST be "true" if your endpoint is
                               // authenticated via either a session cookie
                               // or Authorization header. Otherwise the
                               // browser will block the response.

            methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
                                                   // pre-flight OPTIONS requests
        }));
        app.use(morgan('dev'));
        app.use((req, res, next) => {
            res.locals.path = req.path;
            next();
        });
        const apiRoutes = require('./routes');
        app.use('/api', apiRoutes);

        // Websockets
        const websocket = require('ws');
        const wss = new websocket.WebSocketServer({port:3001});
        const clients = new Map();
        wss.on('connection', (ws) => {
            console.log('connection ws', ws);
            const id = uuidv4();
            const metadata = {id};
            clients.set(ws, metadata)
            ws.on('message', (message) => {
                const mess = JSON.parse(message);
                const metadata = clients.get(ws);
                console.log('ws message', mess, metadata);

                const outboundMessage = JSON.stringify(mess);
                [...clients.keys()].forEach(client => {
                    client.send(outboundMessage);
                })
            });
            ws.on('close', () => {
                clients.delete(ws);
            });
        });

        function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        console.log("wss up");
    });
} catch (e) {
    console.error(e);
}
