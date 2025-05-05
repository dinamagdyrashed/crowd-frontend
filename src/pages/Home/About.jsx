import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Globe, Users, ShieldCheck } from "lucide-react";

const Section = ({ icon: Icon, title, children }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="bg-white shadow-md rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg"
  >
    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4 text-[#006A71]">
      <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
      <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm sm:text-base">{children}</p>
  </motion.div>
);

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#F2EFE7] py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 sm:mb-8 md:mb-12"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
          <span className="text-[#006A71]">Athr – أثر</span>
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
          A sustainable donation platform built to create impact that lives on. Empowering transparent giving, real stories, and lasting change.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Section icon={Heart} title="Sustainable Giving">
          Every campaign aims to leave a lasting mark – from supporting patients to building schools.
        </Section>

        <Section icon={ShieldCheck} title="Verified & Transparent">
          All donations are licensed and reviewed with full visibility into fund usage and impact.
        </Section>

        <Section icon={Users} title="Real-Time Interaction">
          Donors can chat with beneficiaries, track progress, and feel connected to the change.
        </Section>

        <Section icon={Globe} title="Broad Impact">
          From Egypt to the Arab world – Athr brings trusted charity to every screen and heart.
        </Section>

        <Section icon={Sparkles} title="Inspiring Stories">
          We showcase before & after transformations like Roqaya’s to prove your donation matters.
        </Section>

        <Section icon={Heart} title="Smart Donation Flow">
          No random links, no confusion – just clear cases, verified needs, and fast action.
        </Section>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-6 sm:mt-8 md:mt-12 bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8 text-center max-w-sm sm:max-w-md md:max-w-4xl mx-auto"
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-[#006A71]">“A Roqaya Story”</h2>
        <p className="text-gray-600 text-sm sm:text-base mb-2">
          Roqaya needed urgent treatment. If Athr had existed earlier, her case could’ve been solved faster with transparent support and easier access for donors.
        </p>
        <p className="italic text-gray-500 text-xs sm:text-sm">Let’s make sure future Roqayas get help in time.</p>
      </motion.div>
    </div>
  );
};

export default AboutUs;