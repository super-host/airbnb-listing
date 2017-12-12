import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema({
  listingID: { type: Schema.Types.ObjectId, ref: 'User' },
  body: { type: String, trim: true },
  rating: Number,
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
