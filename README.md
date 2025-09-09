# PicHub 🖼️

> A fullstack AI-powered image generation platform that allows users to create, optimize, and manage images seamlessly.

Built with a modern tech stack, PicHub provides a secure, responsive, and user-friendly experience for generating and displaying AI-crafted images using Google Gemini's powerful AI capabilities.

## ✨ Features

- 🖌️ **AI Image Generation**: Create unique images using Google Gemini's AI capabilities
- 🖼️ **Image Optimization**: Optimize and store images efficiently with ImageKit
- 🔒 **Secure Authentication**: Clerk-based authentication for secure user access
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 📂 **Image Management**: Store and retrieve images with MongoDB
- 🔔 **Real-time Feedback**: Instant feedback on image generation and uploads
- ⚙️ **Scalable Infrastructure**: Built with Node.js and Express for robust backend performance
- 🚀 **Deployment Ready**: Configured for easy deployment on free-tier hosting platforms

## 🛠️ Tech Stack

### Frontend
- **React** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database

### Third-party Services
- **Google Gemini** - AI image generation
- **ImageKit** - Image optimization and delivery
- **Clerk** - Authentication and user management

## 🚀 Getting Started

### 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 16 or higher)
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Google Gemini API** keys from Google Cloud
- **ImageKit** account and API keys
- **Clerk** account and API keys

### 🛠️ Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Rocky4554/PicHub.git
   cd PicHub
   ```

2. **Backend Setup**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Install dependencies
   npm install
   
   # Create environment file
   cp .env.example .env
   ```

3. **Configure Backend Environment**
   
   Create a `.env` file in the `/backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_uri
   GOOGLE_GEMINI_API_KEY=your_gemini_api_key
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   CLERK_SECRET_KEY=your_clerk_secret_key
   NODE_ENV=development
   ```

4. **Start Backend Server**
   ```bash
   npm run dev
   ```

5. **Frontend Setup**
   ```bash
   # Open new terminal and navigate to frontend
   cd frontend
   
   # Install dependencies
   npm install
   ```

6. **Configure Frontend Environment**
   
   Create a `.env` file in the `/frontend` directory:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_URL=http://localhost:5000
   ```

7. **Start Frontend Development Server**
   ```bash
   npm run dev
   ```

8. **Access the Application**
   - **Backend**: http://localhost:5000
   - **Frontend**: http://localhost:5173

## 📂 Project Structure

```
PicHub/
├── backend/                # Express server and MongoDB integration
│   ├── routes/             # API routes (auth, image generation, etc.)
│   ├── models/             # MongoDB schemas and data models
│   ├── middleware/         # Custom middleware functions
│   ├── controllers/        # Route handlers and business logic
│   ├── config/             # Configuration files
│   ├── index.js            # Backend entry point
│   └── package.json        # Backend dependencies
├── frontend/               # React frontend application
│   ├── src/                # React components, hooks, and utilities
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── App.jsx         # Main App component
│   ├── public/             # Static assets
│   ├── index.html          # HTML template
│   └── package.json        # Frontend dependencies
├── .gitignore              # Git ignore rules
├── LICENSE                 # Project license
└── README.md               # Project documentation
```

## 📖 Usage

1. **Authentication**: Sign up or log in using Clerk authentication
2. **Generate Images**: Enter creative prompts to generate AI images using Google Gemini
3. **Manage Gallery**: View, download, or delete your generated images
4. **Responsive Access**: Use the platform seamlessly across all devices

## 🔮 Roadmap

### Upcoming Features
- [ ] Advanced AI prompt customization for image generation
- [ ] Built-in image editing tools within the platform
- [ ] Multi-language prompt support for AI generation
- [ ] Image rendering optimization with intelligent caching
- [ ] User analytics dashboard for generated images

### Future Enhancements
- [ ] **Image Filters**: Apply various filters and artistic styles to generated images
- [ ] **AI Suggestions**: Smart prompt recommendations based on user preferences
- [ ] **Offline Mode**: Cache generated images for offline viewing capabilities
- [ ] **Batch Operations**: Upload and process multiple images simultaneously
- [ ] **Social Sharing**: Direct integration with social media platforms
- [ ] **Image Moderation**: AI-powered content moderation for generated images
- [ ] **Custom Styles**: User-defined custom AI art styles and templates
- [ ] **Scheduled Generation**: Queue image generation tasks for later processing

## 🤝 Contributing

We welcome contributions to enhance PicHub! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Include tests for new features when applicable
- Update documentation as needed

## 🆘 Support & Issues

If you encounter any issues or have feature requests:

- 📝 [Open an issue](https://github.com/Rocky4554/PicHub/issues) on GitHub
- 📧 Contact the maintainer: [maintainer-email@example.com]
- 💬 Join our community discussions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Raunak** - [@Rocky4554](https://github.com/Rocky4554)

---

<div align="center">

**Made with ❤️ by Raunak**

⭐ Star this repository if you found it helpful!

</div>
