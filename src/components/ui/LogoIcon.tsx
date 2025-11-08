import React from 'react';
import logo from '../../assets/logo-transparent-svg.svg'; // ✅ fix: "assets", not "assests"

interface LogoIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({ className, ...props }) => (
  <img
    src={logo}
    alt="App Logo"
    className={`h-10 w-auto ${className || ''}`}
    {...props}
  />
);

export default LogoIcon;
