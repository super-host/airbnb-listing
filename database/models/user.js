import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  isHost: Boolean,
  isSuperhost: Boolean,
});

const User = mongoose.model('User', userSchema);

export default User;

db.users.insert({ username : 'Alice', isHost : true, isSuperhost: false});
db.users.insert({ username : 'Bob', isHost : true, isSuperhost: true});