import React from 'react';
import { Package, BarChart2, Share2, LucideIcon } from 'lucide-react';
import Logo from '../ui/Logo';
import { motion } from 'framer-motion';

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const Feature = ({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) => (
  <motion.div className="flex gap-4" variants={featureVariants}>
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
        <Icon className="w-6 h-6 text-secondary" />
      </div>
    </div>
    <div>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-white/70 mt-1">{children}</p>
    </div>
  </motion.div>
);

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="hidden lg:flex relative overflow-hidden flex-col justify-between p-12 bg-gradient-to-br from-secondary via-teal-600 to-cyan-700 text-white">
        <motion.div 
          className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-white/5 rounded-full filter blur-3xl opacity-50"
          animate={{ x: [-50, 50, -50], y: [-50, 50, -50] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div 
          className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50"
          animate={{ x: [50, -50, 50], y: [50, -50, 50] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', delay: 5 }}
        />
        
        <div className="relative z-10 flex flex-col justify-between h-full">
          <Logo className="" textClassName="!text-white !text-3xl" />
          
          <div>
            <motion.h1 
              className="font-display text-4xl font-bold tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Sell Smarter with Hypnate
            </motion.h1>
            <motion.p 
              className="mt-4 text-lg text-white/80"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Turn conversations into sales. Manage your store, share products, and track orders seamlessly.
            </motion.p>
          </div>
          <motion.div 
            className="space-y-8"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
          >
              <Feature icon={Package} title="Easy Product Management">
                  Full CRUD operations for your catalog, including stock levels and categories.
              </Feature>
              <Feature icon={Share2} title="WhatsApp Integration">
                  Share products and order links directly with your customers on WhatsApp.
              </Feature>
              <Feature icon={BarChart2} title="Real-time Analytics">
                  Track revenue, orders, and top products from a beautiful dashboard.
              </Feature>
          </motion.div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
