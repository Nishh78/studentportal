import { Schema, model } from "mongoose";

const inchargeInfoSchema = Schema(
  {
    inchargeId: {
      type: String,
      ref: 'user'
    },
    session: {
      type: String,
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
    }
  },
  {
    timestamps: true,
  }
);

const InchargeInfo = model("incharge_info", inchargeInfoSchema);

export default InchargeInfo;
