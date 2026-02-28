import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false
  }
}, { timestamps: true });

// PasswordEncrypt
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  
});

// PasswordMatch 
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
export default User;