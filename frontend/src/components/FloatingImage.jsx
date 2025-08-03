
const FloatingImage = ({ src, alt, position, size = "w-40 h-50" }) => {
  return (
    <div className={`absolute ${position} ${size} rounded-xl overflow-hidden shadow-2xl z-10 hidden lg:block`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500 opacity-30 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
};

export default FloatingImage;
