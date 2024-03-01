const mongoose = require("mongoose");

module.exports = async () => {
    // const mongoUri ='mongodb+srv://hiorganics0:tjG89TTnhuDijuGC@cluster0.md7popc.mongodb.net/?retryWrites=true&w=majority';
    const mongoUri = 'mongodb://localhost:27017/hi_organic_backend'

    try {
        const connect = await mongoose.connect(mongoUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};