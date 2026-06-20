import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        {/* Teacher Image */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="w-full max-w-md rounded-3xl border bg-white p-4 shadow-sm">
            <img
              src="/teacher.jpg"
              alt="Tagalog Teacher"
              className="h-125 w-full rounded-2xl object-cover"
            />
          </div>
        </motion.div>

        {/* Content */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p
            className="mb-4 text-sm font-medium tracking-wider text-gray-500 uppercase"
            style={{ fontFamily: "Inter" }}
          >
            Meet Your Teacher
          </p>

          <h2
            className="text-5xl leading-tight md:text-6xl"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
            }}
          >
            Helping Students Learn
            <br />
            Filipino with Confidence
          </h2>

          <p
            className="mt-6 text-lg leading-8 text-gray-600"
            style={{ fontFamily: "Inter" }}
          >
            Hello and welcome! I am Rho. Professionally, I work as an online
            language coach, specializing in conveying proficiency and fluency in
            Filipino languages, guiding students from around the world through
            virtual instructions. I am passionate about helping students learn
            in a simple, enjoyable, and practical way.
          </p>

          <p
            className="mt-6 text-lg leading-8 text-gray-600"
            style={{ fontFamily: "Inter" }}
          >
            My goal is to make language learning accessible for everyone,
            whether you are a complete beginner or looking to improve your
            communication skills through structured lessons, interactive
            activities, quizzes, and personalized guidance, I help students
            build confidence in speaking, reading, and understanding Filipino
            naturally.
          </p>

          <p
            className="mt-6 text-lg leading-8 text-gray-600"
            style={{ fontFamily: "Inter" }}
          >
            Learning a language is more than memorizing words—it's about
            connecting with people and culture. I look forward to helping you
            achieve your language goals.
          </p>

          {/* Signature */}

          <div className="mt-10">
            <h3
              className="text-6xl md:text-7xl"
              style={{
                fontFamily: "'Great Vibes', cursive",
              }}
            >
              Rhodelyn G.
            </h3>

            <p
              className="mt-2 text-base tracking-wide text-gray-500 uppercase"
              style={{ fontFamily: "Inter" }}
            >
              Filipino Language Teacher
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Cards */}

      <div className="mx-auto mt-20 grid max-w-6xl gap-6 md:grid-cols-3">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p
            className="text-sm tracking-wide text-gray-500 uppercase"
            style={{ fontFamily: "Inter" }}
          >
            Lessons Taught
          </p>

          <h3
            className="mt-2 text-4xl"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
            }}
          >
            1500+
          </h3>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p
            className="text-sm tracking-wide text-gray-500 uppercase"
            style={{ fontFamily: "Inter" }}
          >
            Student Satisfaction
          </p>
          <h3
            className="mt-2 text-4xl"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
            }}
          >
            98%
          </h3>
        </div>
      </div>
    </section>
  );
};

export default About;
