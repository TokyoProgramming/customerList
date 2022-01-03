import express from 'express';
const router = express.Router();

import {
  getCustomers,
  createCustomer,
  deleteCustomer,
  updateCustomer,
} from '../controllers/customerController.js';

router.route('/').get(getCustomers).post(createCustomer);
router.route('/:id').delete(deleteCustomer).put(updateCustomer);

export default router;
