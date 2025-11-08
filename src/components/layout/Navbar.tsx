import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

const navLinks = [
  { name: 'Features', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'About', href: '#' },
  { name: 'Contact', href: '#' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -20 },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              Sign Up
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border"
          >
            <motion.div className="px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={mobileLinkVariants}>
                  <Link
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md font-medium text-muted-foreground hover:text-primary hover:bg-muted"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={mobileLinkVariants} className="border-t border-border pt-4 mt-4 flex items-center gap-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center font-medium text-muted-foreground bg-muted hover:text-primary transition-colors py-2 rounded-md"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
