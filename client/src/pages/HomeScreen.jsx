import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import DashboardPreview from "../components/DashboardPreview";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Testimonial from "../components/Testimonial";
import FAQ from "../components/FAQ";
import LiveSection from "../components/LiveSection";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo?.role === "student") {
      navigate("/student/dashboard", { replace: true });
    }

    if (userInfo?.role === "teacher") {
      navigate("/teacher/dashboard", { replace: true });
    }
  }, [userInfo, navigate]);
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
