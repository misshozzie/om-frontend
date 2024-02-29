import React, { useState, useEffect } from "react";


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

  useEffect(() => {
    const intervalId = setInterval(goToNextImage, 3000); 

    return () => clearInterval(intervalId); // 
  }, [currentImageIndex]); 


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
      <button className="btn bg-customOrange mx-2 btn-sm " onClick={goToPrevImage}>Prev</button>
      <button className="btn bg-customOrange mx-2 btn-sm " onClick={goToNextImage}>Next</button>
    </div>
  </div>
</div>
  );
}
  
  export default HomePage;