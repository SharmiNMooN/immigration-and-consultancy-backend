const mongose = require("mongoose");
const Schema = mongose.Schema;

const reviewSchema = new Schema(
  {
    serviceId: { type: Schema.Types.ObjectId, trim: true, required: true },
    reviewerId: { type: Schema.Types.ObjectId, trim: true, required: true },
    reviewerName: { type: Schema.Types.String, trim: true, required: true },
    reviewerImage: { type: Schema.Types.String, trim: true },
    reviewerEmail: { type: Schema.Types.String, trim: true },
    description: { type: Schema.Types.String, trim: true },
    rating: { type: Schema.Types.Number },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongose.model("reviews", reviewSchema);
