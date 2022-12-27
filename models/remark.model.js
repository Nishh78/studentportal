import { Schema, model } from "mongoose";

const titleSchema = Schema(
  {
    title: {
      type: String,
      required: false
    },
  },
  {
    timestamps: true,
  }
);

const Remark = model("remark", titleSchema);

export default Remark;
