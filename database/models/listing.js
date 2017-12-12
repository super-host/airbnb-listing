import mongoose from 'mongoose';

const { Schema } = mongoose;

const listingSchema = new Schema({
  hostID: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  location: String,
  price: Number,
  maxGuests: Number,
  roomType: String,
  accomodationType: String,
  beds: Number,
  bedrooms: Number,
  bathrooms: Number,
  overallRating: { type: Number, default: 0 },
  availabilityPreferences: {},
});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
