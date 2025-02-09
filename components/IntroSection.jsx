"use client";
import styles from "./IntroSection.module.css";
import { motion } from "framer-motion";
import GitHub from "./sections/GitHub";
import SkillSection from "./SkillSection";
import { Typewriter } from 'react-simple-typewriter';


export default function IntroSection() {
  return (
    <motion.section
      className={styles.appearAnimation}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Intro Content */}
      <motion.div
        className={styles.introContent}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h1>
          Hi! I am <span className={styles.highlight}>Prajwal Rangegowda</span>
        </h1>
        <h2 className={styles.role}>Designer & Developer</h2>
        <p className={styles.description}>
          Bridging the gap between <strong>design and technology</strong>— from
          crafting <strong>sophisticated, sustainable architecture </strong>
          to building <strong>seamless digital experiences</strong> with React &
          TypeScript.
        </p>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        className={styles.skills}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h3>Expertise</h3>
        <motion.ul>
          {[
            " Architectural Design & Planning",
            " UI/UX for Web & Interactive Apps",
            " Frontend Development (React, TypeScript)",
            " Azure Cloud & Web Hosting",
            " Data Visualization & Dashboards",
          ].map((skill, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              {skill}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Call to Action (Buttons) */}
      <motion.div
        className={styles.cta}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 1 }}
      >
        <motion.a
          href="/portfolio"
          className={styles.button}
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.95 }}
        >
          View My Work
        </motion.a>
        <motion.a
          href="https://calendar.notion.so/meet/prajwalsr/3g2u44lig"
          className={styles.outlineButton}
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.95 }}
        >
          Let's Connect
        </motion.a>
      </motion.div>
      
      <SkillSection />
      <GitHub/>
    </motion.section>
  );
}
