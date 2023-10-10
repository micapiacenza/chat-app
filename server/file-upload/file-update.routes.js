const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = (app, io) => {
  // Define a route for handling file uploads
  app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file; // Contains file information
    const message = req.body.message; // The text file-upload
    const room = req.body.room; // The room to which the file-upload belongs

    // Emit the file-upload and file URL to all users in the chat room
    io.to(room).emit('message', { message, fileUrl: `/uploads/${file.filename}`, room });

    res.send('File uploaded successfully');
  });
};
