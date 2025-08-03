// components/FeatureCard.jsx
import React from 'react';

const FeatureCard = ({ title, description }) => {
  return (
 
     <div className="bg-gray-800/40 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 
                    transition-transform duration-200 hover:-translate-y-2">
            {/* <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg mb-4"></div> */}
            <h3 className="text-white font-semibold mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
        </div>
  );
};

export default FeatureCard;
