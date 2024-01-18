import mongoose, { Schema, model, models } from "mongoose";

const usersSchema = new Schema(
  {
    myId: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    muted: {
      type: Boolean,
      default: true,
    },
    playing: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
    },
    url: {
      type: Object,
    },
    roomId: {
      type: mongoose.default.Schema.ObjectId,
      ref: "Room",
    },
  },
  { timestamps: true }
);

const Users = models.Users || model("Users", usersSchema);

export default Users;
