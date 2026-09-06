import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
{
user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},


title: {
  type: String,
  required: [true, "Income title is required"],
  trim: true,
},

amount: {
  type: Number,
  required: [true, "Income amount is required"],
  min: [0, "Amount cannot be negative"],
},

category: {
  type: String,
  required: [true, "Income category is required"],
  trim: true,
},

date: {
  type: Date,
  default: Date.now,
},

description: {
  type: String,
  trim: true,
  default: "",
},


},
{
timestamps: true,
}
);

const Income = mongoose.model("Income", incomeSchema);

export default Income;
