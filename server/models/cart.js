import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema({
  user: {
    type: Object,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Cart", cartSchema);
