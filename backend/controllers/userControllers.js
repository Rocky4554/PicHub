import User from '../modals/User.js';
import { dbConnect } from "../lib/dbconnect.js";

// Create or update user from Clerk webhook/signin
export const createOrUpdateUser = async (req, res) => {
  try {
     await dbConnect(); // ensure connection only for this route
        console.log('Received body:', req.body);
    const { userId, name, email } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ userId });
    
    if (user) {
      // Update existing user's last login
      user.lastLogin = new Date();
      user.name = name; // Update name in case it changed
      user.email = email; // Update email in case it changed
      await user.save();
      
      return res.status(200).json({
        success: true,
        message: 'User updated successfully',
        user: user
      });
    } else {
      // Create new user
      user = new User({
        userId,
        name,
        email,
        isPro: false,
        createdAt: new Date(),
        lastLogin: new Date()
      });
      
      await user.save();
      
      return res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: user
      });
    }
  } catch (error) {
    console.error('Error creating/updating user:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error while processing user'
    });
  }
};

// Get user by userId
export const getUserById = async (req, res) => {
  
  try {
     await dbConnect(); // ensure connection only for this route
    const { userId } = req.params;
    const user = await User.findOne({ userId });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      user: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching user'
    });
  }
};

// Update user's pro status
export const updateProStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isPro } = req.body;
    
    const user = await User.findOneAndUpdate(
      { userId },
      { isPro },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Pro status updated successfully',
      user: user
    });
  } catch (error) {
    console.error('Error updating pro status:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while updating pro status'
    });
  }
};
