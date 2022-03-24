const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3006;

app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost/demo1';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
},);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
const transferRouter = require('./Routes/transfer.routes');
const cashinRouter = require('./Routes/cashin.routes');
const cashoutRouter = require('./Routes/cashout.routes');
const eacheanceRouter = require('./Routes/echeance.routes');
const tontineRouter = require('./Routes/tontine.routes');
// const usersRouter = require('./routes/users');

app.use('/transfer', transferRouter);
app.use('/cashin', cashinRouter);
app.use('/cashout', cashoutRouter);
app.use('/echeance', eacheanceRouter);
app.use('/tontine', tontineRouter);
// app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
