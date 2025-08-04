// 1. User Actions (Actions/user-actions.js)
import { toast } from 'react-toastify';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Function to sync user with database
export const syncUserWithDatabase = async (user) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/sync-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        name: user.fullName || user.firstName + ' ' + (user.lastName || ''),
        email: user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress,
      }),
    });

    const data = await response.json();
    if (data.success) {
      console.log('User synced successfully:', data.user);
      return data.user;
    } else {
      console.error('Failed to sync user:', data.error);
      toast.error('Failed to sync user data');
      return null;
    }
  } catch (error) {
    console.error('Error syncing user:', error);
    toast.error('Error syncing user data');
    return null;
  }
};

// Function to fetch user profile by userId
export const fetchUserProfile = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`);
    const data = await response.json();
    
    if (data.success) {
      return data.user;
    } else {
      console.error('Failed to fetch user profile:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Function to update user's pro status
export const updateUserProStatus = async (userId, isPro) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}/pro-status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isPro }),
    });

    const data = await response.json();
    if (data.success) {
      toast.success(`User ${isPro ? 'upgraded to Pro' : 'downgraded to Free'} successfully!`);
      return data.user;
    } else {
      toast.error('Failed to update pro status');
      return null;
    }
  } catch (error) {
    console.error('Error updating pro status:', error);
    toast.error('Error updating pro status');
    return null;
  }
};

// Function to check if user is pro
export const checkUserProStatus = async (userId) => {
  try {
    const user = await fetchUserProfile(userId);
    return user ? user.isPro : false;
  } catch (error) {
    console.error('Error checking pro status:', error);
    return false;
  }
};

// Function to get user stats (for admin purposes)
export const getUserStats = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}/stats`);
    const data = await response.json();
    
    if (data.success) {
      return data.stats;
    } else {
      console.error('Failed to fetch user stats:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return null;
  }
};