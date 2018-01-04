const app = require('./app.js');
// const app = require('./simulation-server.js');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`now listening on port ${PORT}`));