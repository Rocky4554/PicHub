import React from "react";
import BackgroundBeams from "../components/BackgroundBeams";
// import Header from '../components/Header';
import FloatingImage from "../components/FloatingImage";
import { Link, Outlet } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import Header from "../components/Header";
import Footer from "../components/footer"; 

// Main Component
const HomePage = () => {
  // Placeholder images with floating animation positions
  const placeholderImages = [
    {
      src: "/sample-images/sampleImage4.png",
      alt: "AI Character 1",
      position: "top-20 left-20 animate-float",
    },
    {
      src: "/sample-images/sampleImage5.png",
      alt: "AI Character 2",
      position: "top-32 right-20 animate-float-delayed",
    },
    {
      src: "/sample-images/sampleImage6.png",
      alt: "AI Character 3",
      position: "bottom-40 left-16 animate-float-slow",
    },
    {
      src: "/sample-images/sampleImage7.png",
      alt: "AI Character 4",
      position: "bottom-60 right-24 animate-float-reverse",
    },
  ];

  const imagePaths = [
    "/sample-images/sampleImage.png",
    "/sample-images/sampleImage1.png",
    "/sample-images/sampleImage2.png",
    "/sample-images/sampleImage3.png",
  ];

  const features = [
 
  {
    title: 'Edit & Enhance',
    description: 'Modify existing images with AI: enhance, upscale, or transform them into new styles.',
  },
  {
    title: 'Save & Download',
    description: 'Save your creations to your profile or download them instantly in high quality.',
  },
  {
    title: 'Download & Share',
    description: 'Export images in multiple formats (PNG, JPG, SVG) in high resolution.',
  },
  
];

  return (
    <>
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      {/* Background Beams - Fixed */}
      <div className="fixed inset-0 z-0">
        <BackgroundBeams />
      </div>

      {/* Header - Fixed */}
      {/* <Header /> */}
      <Header /> 

      {/* Scrollable Content */}

      <div className="relative z-10">
        {/* Floating Images */}
        {placeholderImages.map((image, index) => (
          <FloatingImage
            key={index}
            src={image.src}
            alt={image.alt}
            position={image.position}
          />
        ))}

        {/* Main Content */}
        <main className="px-6 pt-24 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Best AI Content Platform
            </h1>

            {/* Subheading with gradient */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-8 leading-tight">
              For Image Generator
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
              Unleash Your Creativity with Our All-in-One Image Generation &
              Crafting App!
              <br />
              Transform Your Thoughts into Stunning Visuals.
            </p>

            {/* Single Page Demo */}
            <div className="w-full flex justify-center mt-16">
              <div className="max-w-2xl w-full">
                <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-2xl hover:bg-gray-800/50 transition-all duration-300">
                  <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 mb-4 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full shadow-lg"></div>
                        <span className="text-white text-sm font-medium">
                          Image AI
                        </span>
                      </div>
                      <Link to="/sample">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors shadow-md">
                          Get Started
                        </button>
                      </Link>
                    </div>

                    <div className="text-center mb-4">
                      <h3 className="text-white font-semibold mb-2">
                        Elevate Your Experience With
                      </h3>
                      <h4 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Best AI Image Generator
                      </h4>
                      <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                        Instantly create stunning images from text prompts using
                        advanced AI models.
                      </p>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {imagePaths.map((src, i) => (
                        <div
                          key={i}
                          className="aspect-square overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                          <img
                            src={src}
                            alt={`Sample ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* </div> */}
          </div>
        </main>

        {/* Add more content to demonstrate scrolling */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              More Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
         
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>
        <main>
          <Outlet />
        </main>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            );
          background-size: 50px 50px;
        }

        @keyframes beam-1 {
          0% {
            transform: translateX(10px) translateY(-100px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100px) translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes beam-2 {
          0% {
            transform: translateX(200px) translateY(-100px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes beam-3 {
          0% {
            transform: translateX(400px) translateY(-100px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(500px) translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }

        .animate-beam-1 {
          animation: beam-1 8s linear infinite;
        }
        .animate-beam-2 {
          animation: beam-2 10s linear infinite 2s;
        }
        .animate-beam-3 {
          animation: beam-3 12s linear infinite 4s;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 1s;
        }
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float 6s ease-in-out infinite reverse;
        }
      `}</style>
    </div>
     <Footer />
     </>
  );
};

export default HomePage;
