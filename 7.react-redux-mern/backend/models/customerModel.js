import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  age: { type: Number, require: true },
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
