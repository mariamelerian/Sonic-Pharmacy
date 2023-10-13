import Carousel from "react-bootstrap/Carousel";
import React, { useState, useEffect } from "react";
import medicine from "../../Assets/medicineImg.png";

const RegPhoto = () => {
  const carouselData = [
    {
      id: 1,
      src: medicine,
      alt: "First Slide",
    },
    {
      id: 2,
      src: medicine,
      alt: "Second Slide",
    },
    {
      id: 3,
      src: medicine,
      alt: "Third Slide",
    },
  ];
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < 2) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  return (
    <div className="col-9">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={3000}
        controls={false}
      >
        {carouselData.map((item) => (
          <Carousel.Item key={item.id}>
            <img className="d-block w-100" src={item.src} alt={item.alt} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default RegPhoto;
