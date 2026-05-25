import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Moon,
  ArrowRightLeft,
  Copy,
  Smartphone,
  Sparkles,
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
    >
      {/* Gradient background blur effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card container with glassmorphism */}
      <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 overflow-hidden transition-all duration-300 group-hover:border-violet-400/50 dark:group-hover:border-violet-400/30 group-hover:shadow-2xl group-hover:shadow-violet-500/10">
        {/* Animated gradient border on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-px bg-gradient-to-br from-violet-500 to-cyan-500 pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Icon container with gradient background */}
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-violet-600 dark:text-violet-400 group-hover:from-violet-500/30 group-hover:to-cyan-500/30 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
            {description}
          </p>

          {/* Decorative arrow that appears on hover */}
          <motion.div
            className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            <span>Learn more</span>
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              →
            </motion.span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Zap size={40} className="stroke-current" />,
      title: 'Instant Translation',
      description: 'Understand any text instantly in your preferred language with reliable translation.',
    },
    {
      icon: <Sparkles size={40} className="stroke-current" />,
      title: 'Multi-Language Support',
      description: 'Translate between 100+ global languages easily and seamlessly.',
    },
    {
      icon: <ArrowRightLeft size={40} className="stroke-current" />,
      title: 'Smart Language Swap',
      description: 'Instantly switch between source and target languages with one click.',
    },
    {
      icon: <Copy size={40} className="stroke-current" />,
      title: 'One-Click Copy',
      description: 'Copy translated text quickly and use it anywhere in your workflow.',
    },
    {
      icon: <Moon size={40} className="stroke-current" />,
      title: 'Dark/Light Mode',
      description: 'Comfortable viewing experience in any lighting with smooth theme switching.',
    },
    {
      icon: <Smartphone size={40} className="stroke-current" />,
      title: 'Fully Responsive Design',
      description: 'Works smoothly on mobile, tablet, and desktop for a seamless experience.',
    },
  ];

  return (
    <section
      id="features"
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden scroll-mt-16"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-gradient-to-b from-violet-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-to-t from-cyan-500/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
            Powerful Features
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Everything you need for seamless translation with a modern, intuitive interface
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Ready to translate? Start now and experience the power of LangFlow
          </p>
          <motion.a
            href="#translate"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl font-semibold text-white cursor-pointer backdrop-blur-xl bg-gradient-to-r from-violet-600 to-cyan-500 border border-white/20 shadow-lg shadow-violet-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30"
          >
            Get Started
            <span className="ml-2">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
