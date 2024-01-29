import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect('mongodb+srv://amienulrana:byOtCsJQxUqxTe9E@cluster0.chpnrog.mongodb.net/meet-app?retryWrites=true&w=majority');

export default connectMongo;