import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { Twitter, Github, Dribbble } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Features', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Integrations', href: '#' },
    { name: 'API', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' },
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Status', href: '#' },
  ],
  legal: [
    { name: 'Terms of Service', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
};

const socialLinks = [
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'GitHub', href: '#', icon: Github },
  { name: 'Dribbble', href: '#', icon: Dribbble },
];

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <Link to="/">
              <Logo textClassName="!text-foreground" />
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Turn conversations into sales. Manage your store, share products, and track orders seamlessly.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-base text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-base text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-base text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-base text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-base text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Hypnate, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
