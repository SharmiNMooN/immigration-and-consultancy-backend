const mongose = require("mongoose");
const Schema = mongose.Schema;

const serviceSchema = new Schema(
  {
    name: { type: Schema.Types.String, trim: true, required: true },
    description: { type: Schema.Types.String, trim: true },
    image: { type: Schema.Types.String, trim: true },
    price: { type: Schema.Types.Number },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongose.model("services", serviceSchema);
