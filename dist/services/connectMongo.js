import mongoose from 'mongoose';
export const connectMongo = (URL) => {
    mongoose
        .connect(URL, { dbName: 'blogApp' })
        .then((e) => {
        console.log(`connected to ${e.connection.host}`);
    })
        .catch((err) => {
        console.log(err);
    });
};
