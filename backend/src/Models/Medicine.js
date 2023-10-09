const mongoose = require("mongoose");
const { MedicinalUseArray } = require("./MedicinalUse");

const medicineSchema = new mongoose.Schema({
  picture: {
    data: Buffer, // Store image data as Buffer
    contentType: String, // Specify the content type of the image
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sales: {
    type: Number,
    default: 0,
  },
  activeIngredients: {
    type: [String], // Assuming an array of strings for active ingredients
    required: true,
  },
  medicinalUse: {
    type: String,
    enum: MedicinalUseArray,
    required: true,
  },
});

// Define a virtual property to convert picture data to base64 data URI
medicineSchema.virtual("imageSrc").get(function () {
  if (this.picture && this.picture.data && this.picture.contentType) {
    const imageData = Buffer.from(this.picture.data).toString("base64");
    return `data:${this.picture.contentType};base64,${imageData}`;
  }
  return null;
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
