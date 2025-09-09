PicHub 🖼️
PicHub is a fullstack AI-powered image generation platform that allows users to create, optimize, and manage images seamlessly. Built with a modern tech stack, it provides a secure, responsive, and user-friendly experience for generating and displaying AI-crafted images.
✨ Features

🖌️ AI Image Generation: Create unique images using Google Gemini's AI capabilities
🖼️ Image Optimization: Optimize and store images efficiently with ImageKit
🔒 Secure Authentication: Clerk-based authentication for secure user access
📱 Responsive Design: Optimized for desktop, tablet, and mobile devices
📂 Image Management: Store and retrieve images with MongoDB
🔔 Real-time Feedback: Instant feedback on image generation and uploads
⚙️ Scalable Infrastructure: Built with Node.js and Express for robust backend performance
🚀 Deployment Ready: Configured for easy deployment on free-tier hosting platforms

🛠️ Tech Stack

Frontend: React, TailwindCSS
Backend: Node.js, Express, MongoDB
AI: Google Gemini for image generation
Image Optimization: ImageKit for efficient image storage and delivery
Authentication: Clerk for secure user management
Build Tool: Vite (frontend)
Environment: Node.js

🚀 Getting Started
📋 Prerequisites

Node.js: Version 16 or higher
MongoDB: Local or cloud instance (e.g., MongoDB Atlas)
Google Gemini API: Obtain API keys from Google Cloud
ImageKit Account: Obtain API keys from ImageKit
Clerk Account: Obtain API keys from Clerk

🛠️ Installation

Clone the Repository:
git clone https://github.com/Rocky4554/PicHub.git
cd PicHub


Backend Setup:
Navigate to the backend directory:
cd backend

Install dependencies:
npm install

Create a .env file in /backend with the following:
PORT=5000
MONGO_URI=your_mongo_uri
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
CLERK_SECRET_KEY=your_clerk_secret_key
NODE_ENV=development

Start the backend:
npm run dev


Frontend Setup:
Navigate to the frontend directory:
cd frontend

Install dependencies:
npm install

Create a .env file in /frontend with the following:
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000

Start the frontend:
npm run dev


Access the Application:

Backend runs on http://localhost:5000
Frontend runs on http://localhost:5173 (or another port assigned by Vite)



📂 Project Structure
PicHub/
├── backend/                # Express server and MongoDB integration
│   ├── routes/             # API routes (e.g., auth, image generation)
│   ├── models/             # MongoDB schemas
│   └── index.js            # Backend entry point
├── frontend/               # React frontend
│   ├── src/                # React components, hooks, and utilities
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
└── README.md               # Project documentation

📖 Usage

Sign Up/Login: Create a new account via Clerk
Generate Images: Input prompts to create AI-generated images using Google Gemini
Manage Images: View, download, or delete images stored via ImageKit
Responsive UI: Access the platform seamlessly across devices

🤝 Contributing
We welcome contributions to enhance PicHub. To contribute:

Fork the repository
Create a feature branch:git checkout -b feature/your-feature


Commit your changes:git commit -m "Add your feature"


Push to the branch:git push origin feature/your-feature


Open a Pull Request with a detailed description of your changes

Please adhere to the project's coding standards and include tests where applicable.
🔮 Roadmap

🖌️ Add advanced AI prompt customization for image generation
📎 Implement image editing tools within the platform
🌍 Support multi-language prompts for AI generation
⚡ Optimize image rendering with caching
📊 Add analytics for user-generated images

🌟 Future Features
We are actively working on enhancing PicHub with the following features:

🎨 Image Filters: Apply filters or styles to generated images
🤖 AI Suggestions: Suggest prompts based on user preferences
📴 Offline Mode: Cache generated images for offline viewing
📤 Batch Uploads: Allow users to upload multiple images for processing
🔗 Social Sharing: Share generated images directly to social platforms

Suggested Features:

🛡️ Image Moderation: Add AI-powered moderation for generated content
😄 Custom Styles: Allow users to define custom AI art styles
📅 Scheduled Generation: Schedule image generation tasks for later

🆘 Support
For issues, feature requests, or questions, please:

Open an issue on the GitHub Issues page
Contact the maintainer at [maintainer-email@example.com] (replace with actual contact)


Made with ❤️ by Raunak
