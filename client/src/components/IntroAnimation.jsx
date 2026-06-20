import React from "react";
import { motion } from "framer-motion";

const IntroAnimation = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.5, duration: 1 }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-white text-5xl font-bold tracking-wide">
          Kapwa Connect
        </h1>

        <motion.div
          className="w-40 h-1 bg-white mx-auto mt-4 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 160 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default IntroAnimation;