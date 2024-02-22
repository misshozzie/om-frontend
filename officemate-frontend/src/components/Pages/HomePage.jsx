import React, { useState } from "react";


function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://i.imgur.com/wDKJjcw.png",
    "https://i.imgur.com/eW8crS8.png",
    "https://i.imgur.com/9oQ9xub.png"
  ]

  const goToNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div>
      <div
    className="hero min-h-[90vh] flex flex-col justify-between" // Added flex-col and justify-between
    style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
  >
    <div className="hero-overlay bg-opacity-10"></div>
    <div className="hero-content text-center text-neutral-content">
      {/* Content here */}
    </div>
    <div className="pb-5 text-center"> {/* Added padding-bottom and text-center */}
      <button className="btn btn-primary mx-2" onClick={goToPrevImage}>Prev</button> {/* Added margin for spacing */}
      <button className="btn btn-primary mx-2" onClick={goToNextImage}>Next</button>
    </div>
  </div>
</div>
  );
}
  
  export default HomePage;