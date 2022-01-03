import asyncHandler from 'express-async-handler';
import Customer from '../models/customerModel.js';

// @description get customers
// @GET /api/customer
// @access public
const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find();
  if (customers) {
    res.json(customers);
  } else {
    res.status(500);
    throw new Error('No Customer');
  }
});

// @description create customer
// @POST /api/customer
// @access public
const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, location, age } = req.body;

  const userExists = await Customer.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User Already exists');
  }

  const customer = await Customer.create({
    name,
    email,
    location,
    age,
  });

  if (customer) {
    res.status(201).json({
      name: customer.name,
      email: customer.email,
      location: customer.location,
      age: customer.age,
    });
  } else {
    res.status(400);
    throw new Error('Invalid customer information');
  }
});

// @description delete customer
// @POST /api/customer/:id
// @access public
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    await customer.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('customer not found');
  }
});

// @description update customer
// @POST /api/customer/:id
// @access public
const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    customer.name = req.body.name || customer.name;
    customer.email = req.body.email || customer.email;
    customer.location = req.body.location || customer.location;
    customer.age = req.body.age || customer.age;

    const updateCustomer = await customer.save();

    res.json({
      _id: updateCustomer._id,
      name: updateCustomer.name,
      email: updateCustomer.email,
      location: updateCustomer.location,
      age: updateCustomer.age,
    });
  } else {
    res.status(404);
    throw new Error('customer not found');
  }
});

export { getCustomers, createCustomer, deleteCustomer, updateCustomer };
