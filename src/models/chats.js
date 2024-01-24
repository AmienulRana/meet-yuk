import mongoose, { Schema, model, models } from "mongoose";

const chatSchema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    myId: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Chats = models.Chats || model("Chats", chatSchema);

export default Chats;
