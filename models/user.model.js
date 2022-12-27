import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: false
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    mobile: {
      type: Number,
      required: false
    },
    class: {
      type: String,
      required: false
    },
    section: {
      type: String,
      required: false
    },
    term: {
      type: String,
      required: false
    },
    role: {
      type: String,
      required: false,
      default: "superadmin",
    },
    password: {
      type: String,
      required: false,
      minlength: 8,
      default: null,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("user", userSchema);

export default User;
