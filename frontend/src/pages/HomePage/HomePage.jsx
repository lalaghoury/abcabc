import React from "react";
import "./HomePage.scss";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/HeroSection/HeroSection";
import Deals from "../../components/Deals/Deals";

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <Deals />
      <Footer />
    </div>
  );
};

export default HomePage;
