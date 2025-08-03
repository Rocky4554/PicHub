import React, { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fix: Correct way to access Vite environment variables
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error message when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Name is required');
      return false;
    }
    
    if (!formData.email.trim()) {
      setErrorMessage('Email is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    
    if (!formData.message.trim()) {
      setErrorMessage('Message is required');
      return false;
    }
    
    if (formData.message.trim().length < 10) {
      setErrorMessage('Message must be at least 10 characters long');
      return false;
    }
    
    if (!agreedToPrivacy) {
      setErrorMessage('Please agree to the Privacy Policy');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');
    setErrorMessage('');

    // Debug: Log the API URL and request data
    console.log('API_BASE_URL:', API_BASE_URL);
    console.log('Request URL:', `${API_BASE_URL}/api/contact-us`);
    console.log('Form data:', {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim()
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact-us`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server did not return JSON response');
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setAgreedToPrivacy(false);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.message || `Server error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      // More specific error messages
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setErrorMessage('Unable to connect to server. Please check if the server is running and try again.');
      } else if (error.message.includes('JSON')) {
        setErrorMessage('Server returned an invalid response. Please try again later.');
      } else {
        setErrorMessage(`Network error: ${error.message}. Please check your connection and try again.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
      {/* Left side - Contact Info */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-16 flex flex-col justify-center">
        <div className="max-w-lg mx-auto lg:mx-0">
          <p className="text-orange-400 text-sm font-medium mb-3 sm:mb-4">Contact Section</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight">
            Get in touch
          </h1>
          <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-10 lg:mb-12 leading-relaxed">
            We'd love to hear from you! Send us a message and we'll respond within 24-48 hours. Our team is ready to help you with any questions or concerns.
          </p>

          {/* Contact Details */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              <span className="text-base sm:text-lg break-all">8092345121</span>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              <span className="text-base sm:text-lg break-all">ultimatekller45@gmail.com</span>
            </div>
            <div className="flex items-start space-x-3 sm:space-x-4">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-1" />
              <span className="text-base sm:text-lg">Delhi, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Contact Form */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-16 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto lg:mx-0">
      
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-900 border border-green-600 text-green-100 rounded-lg text-sm sm:text-base flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Message sent successfully!</p>
                <p className="text-sm text-green-200 mt-1">We'll get back to you within 24-48 hours.</p>
              </div>
            </div>
          )}
          
          {(submitStatus === 'error' || errorMessage) && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-900 border border-red-600 text-red-100 rounded-lg text-sm sm:text-base flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Error</p>
                <p className="text-sm text-red-200 mt-1">{errorMessage || 'Something went wrong. Please try again.'}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 sm:space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-colors text-sm sm:text-base"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-colors text-sm sm:text-base"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help you..."
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-colors resize-none text-sm sm:text-base"
                  required
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 10 characters</p>
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={agreedToPrivacy}
                  onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                  className="mt-1 w-4 h-4 text-orange-400 bg-gray-900 border-gray-700 rounded focus:ring-orange-400 focus:ring-2 flex-shrink-0"
                  disabled={isSubmitting}
                />
                <label htmlFor="privacy" className="text-xs sm:text-sm text-gray-400">
                  I agree to the{' '}
                  <a 
                    href="/privacy-policy" 
                    className="text-orange-400 hover:text-orange-300 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>{' '}
                  and consent to being contacted regarding my inquiry. *
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-200 text-black py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send message</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;