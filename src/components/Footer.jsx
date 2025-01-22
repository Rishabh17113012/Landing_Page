import React from "react";
import Section from "./Section";
import { socials } from "../constants";

const Footer = () => {
  return (
    <Section
      crosses
      className="!px-0 !py-10 bg-gradient-to-b from-gray-900 to-gray-800 text-white"
    >
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
        {/* Footer Text */}
        <p className="text-sm text-gray-400 lg:block">
          © {new Date().getFullYear()} ATC AI. All rights reserved.
        </p>

        {/* Social Media Links */}
        <ul className="flex gap-5 flex-wrap">
          {socials.map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full transition-transform transform hover:scale-110 hover:bg-blue-500 focus:ring-2 focus:ring-blue-300"
                aria-label={item.title}
              >
                <img
                  src={item.iconUrl}
                  width={16}
                  height={16}
                  alt={item.title}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-gray-700 my-6"></div>

      {/* Additional Footer Content */}
      <div className="container text-center">
        <p className="text-xs text-gray-500">
          Crafted with ❤️ by the ATC AI team. Empowering creators with
          futuristic tools.
        </p>
      </div>
    </Section>
  );
};

export default Footer;
