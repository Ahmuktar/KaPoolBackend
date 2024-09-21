const express = require('express');
const Payment = require('../models/Payment');
const router = express.Router();

// Create a payment
const createPayment = async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a payment by ID
const getPayments = async (req, res) => {
  try {
    const payment = await Payment.find().populate('ride_id');
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a payment by ID
const getPaymentsByUser = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('ride_id');;
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a payment by ID
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    createPayment,
    getPaymentById,
    getPayments,
    getPaymentsByUser
}
