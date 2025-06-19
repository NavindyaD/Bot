const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const chatRouter = require('./routes/chat');
const rateLimiter = require('./middleware/rateLimiter');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use('/api/chat', chatRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
