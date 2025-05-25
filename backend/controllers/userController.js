import User from '../models/User.js'
import asyncHandler from 'express-async-handler'


export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.status(201).json(user);
});


export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});