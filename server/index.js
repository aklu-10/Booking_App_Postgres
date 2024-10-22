const express = require('express');
const { default: mongoose } = require('mongoose');
const pool = require('./db');
const { hotelRouter } = require('./routes/hotels');
const { userRouter } = require('./routes/users');
const { authRouter } = require('./routes/auth');
const cookieParser = require('cookie-parser');
const { roomRouter } = require('./routes/rooms');
const cors = require('cors');
const { roomNumberRouter } = require('./routes/roomnumbers');
const app = express();
require('dotenv').config();

const connect = async () => {
    try{

        await pool.connect()
        console.log('DB Connected');

    } catch(err){
        console.log(err);
    }
    

}

connect();

// mongoose.connection.on('disconnected', ()=>{
//     console.log('DB disconnected')
// })

app.use(cors())
app.use(express.json());
app.use(cookieParser())

app.use('/api/hotels', hotelRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/roomsnumbers', roomNumberRouter);


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong';

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.listen(process.env.PORT, ()=>console.log(`Server Started at ${process.env.PORT}`))