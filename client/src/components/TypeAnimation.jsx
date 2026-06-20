import { TypeAnimation } from "react-type-animation";

const Animation = () => {
  return (
    <span className="text-4xl font-bold leading-tight md:text-6xl">
      Speak Filipino
      <br />
      With{" "}
      <TypeAnimation
        sequence={[
          "Confidence.",
          2000,
          "Culture.",
          2000,
          "Connection.",
          2000,
          "Fluency.",
          2000,
        ]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
      />
    </span>
  );
};

export default Animation;
