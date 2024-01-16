import { Schema, model, models } from 'mongoose';

const roomSchema = new Schema({
  name: {
    type:String,
    required:true
  },
}, {timestamps: true});

const Room = models.Room || model('Room', roomSchema);

export default Room;