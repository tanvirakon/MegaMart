import React from "react";
import Carousel from "react-bootstrap/Carousel";

function Carosoul() {
  return (
    <div className="mt-4">
      <Carousel data-bs-theme="dark">
        <Carousel.Item className="h-[40rem]">
          <img
            className="d-block w-100 rounded-lg"
            src="https://images.unsplash.com/photo-1714745454857-5adce201be50?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item className="h-[40rem]">
          <img
            className="d-block w-100 rounded-lg"
            src="https://plus.unsplash.com/premium_photo-1701094772334-07af1a16bd42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item className="h-[40rem]">
          <img
            className="d-block w-100 rounded-lg"
            src="https://plus.unsplash.com/premium_photo-1669802766533-85e0624ff1bd?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Carosoul;
