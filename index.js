require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./jwtserver/router/indexuter/index');
const PORT = process.env.PORT || 5000;
const app = express();
const errorMiddleware = require('./jwtserver/middlewares/error-middlewaremiddleware');
app.use(express.static(__dirname + '/dist/ngforecast'));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));
app.use('/api', router);
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/ngforecast/index.html'));
});
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
