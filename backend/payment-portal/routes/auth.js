const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import User model
const ExpressBrute = require('express-brute');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/token-auth');


//express brute set up for brute force attacks
const store = new ExpressBrute.MemoryStore();
const bruteForce = new ExpressBrute(store);

//this is the regex patterns for validation in the routes
const userNamePattern = /^[a-zA-Z0-9._-]{3,20}$/; // Username must be 3-20 characters long
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/; // At least 5 chars, 1 letter, 1 number
const idNumberPattern = /^\d{8,}$/; // ID Number must be at least 8 digits

//login route
router.post('/login', bruteForce.prevent, async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: 'ID Number and password are required.' });
  }
  if (!userNamePattern.test(userName) || !passwordPattern.test(password)) {
    return res.status(400).json({ message: 'Invalid username or password format.' });
  }

  try {
    //find user by user
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //Generate jwt token
    const token = jwt.sign({ id: user._id, userName: user.userName }, process.env.JWT_SECRET, {
      expiresIn: '1h', //token only lasts an hour
    });

    return res.status(200).json({ status: 'success', token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

//register route
router.post('/register', bruteForce.prevent, async (req, res) => {
  const { fullName, userName, idNumber, accountNumber, password } = req.body;

  if (!fullName || !userName || !idNumber || !accountNumber || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (!userNamePattern.test(userName) || !idNumberPattern.test(idNumber) || 
      !passwordPattern.test(password)) {
    return res.status(400).json({ message: 'Invalid input format.' });
  }

  try {
    //cheacks if the user already exists
    const existingUser = await User.findOne({ $or: [{ idNumber }, { accountNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this ID number or account number.' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      fullName,
      userName,
      idNumber,
      accountNumber,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ status: 'success', message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Endpoint to handle the payment amount
router.post('/payment', verifyToken, async (req, res) => {
  

  try {
    const { amount, currency, provider} = req.body;

    // Find the user by their ID (from the JWT token)
    const user = await User.findById(req.user.id.toString()); // Convert to string

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user with the bank details
    user.paymentPortal = {
      amount,
      currency,
      provider,
    };

    await user.save();
    res.json({ success: true, message: 'Payment details updated successfully' });
  } catch (error) {
    console.error('Error updating payment details:', error); // Log the error
    res.status(500).json({ success: false, message: 'Server error while updating payment details' });
  }
});

// Endpoint to handle the account details
router.post('/account-details', verifyToken, async (req, res) => {
  

  try {
    const { accountHolderName, bank, bankAccountNumber, swiftCode } = req.body;

    // Find the user by their ID (from the JWT token)
    const user = await User.findById(req.user.id.toString()); // Convert to string

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user with the bank details
    user.accountDetails = {
      accountHolderName, // The account holder's name
      bank,              // The name of the bank
      bankAccountNumber,     // The account number
      swiftCode,        // The SWIFT code
    };

    await user.save();
    res.json({ success: true, message: 'Account details updated successfully' });
  } catch (error) {
    console.error('Error updating account details:', error); // Log the error
    res.status(500).json({ success: false, message: 'Server error while updating account details' });
  }
});



module.exports = router;



