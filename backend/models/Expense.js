import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
{
user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},


title: {
  type: String,
  required: [true, "Expense title is required"],
  trim: true,
},

amount: {
  type: Number,
  required: [true, "Expense amount is required"],
  min: [0, "Amount cannot be negative"],
},

category: {
  type: String,
  required: [true, "Expense category is required"],
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

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
