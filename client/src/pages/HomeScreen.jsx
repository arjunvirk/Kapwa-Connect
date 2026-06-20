import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import DashboardPreview from "../components/DashboardPreview";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Testimonial from "../components/Testimonial";
import FAQ from "../components/FAQ";
import LiveSection from "../components/LiveSection";

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!loading && (
        <div className="animate-fadeIn">
          <Hero />
          <Features />
          <DashboardPreview />
          <LiveSection />
          <CTA />
          <Testimonial />
          <FAQ />
          <Footer />
        </div>
      )}
    </>
  );
};

export default HomeScreen;
