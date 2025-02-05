import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button"; // Import your Button component

const Chatbot = () => {
  const navigate = useNavigate();

  // Check if the user prefers dark mode or light mode, and save it in state
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  // Listen to changes in system color scheme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setIsDarkMode(e.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Toggle the theme between light and dark mode and save it in local storage
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light"); // Save theme preference
      return newMode;
    });
  };

  const themeStyle = isDarkMode
    ? {
        backgroundColor: "#121212",
        color: "#E0E0E0",
        border: "1px solid #444",
      }
    : {
        backgroundColor: "white",
        color: "black",
        border: "1px solid #ddd",
      };

  return (
    <div
      className="chatbot-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Adding a slight transparent overlay
      }}
    >
      <div
        className="webchat"
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div
          className="bot-container"
          style={{
            height: "100%",
            width: "80%", // 80% of screen width
            maxWidth: "700px", // Max width increased to 700px
            borderRadius: "8px",
            boxShadow: isDarkMode ? "0 4px 8px rgba(0, 0, 0, 0.3)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
            ...themeStyle,
          }}
        >
          <iframe
            style={{
              height: "100%",
              width: "100%",
              border: "none",
              borderRadius: "8px",
            }}
            srcDoc={`
              <!doctype html>
              <html lang="en">
                <head>
                  <style>
                    body {
                      font-family: IBM Plex Sans, sans-serif;
                      background-color: ${isDarkMode ? "#121212" : "#ffffff"};
                      color: ${isDarkMode ? "#E0E0E0" : "#000000"};
                      margin: 0;
                      padding: 0;
                    }
                    /* Override text shadows and other styles if needed */
                    * {
                      text-shadow: none !important;
                    }
                  </style>
                </head>
                <body>
                  <script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"></script>
                  <script defer>
                    window.botpress.on("webchat:ready", (conversationId) => {
                      botpress.open();
                    });
                    window.botpress.init({
                      "botId": "7f386455-a76e-4647-b8f2-9d2f4a6d796a",
                      "configuration": {
                        "composerPlaceholder": "Get ATC info instantly.....Typing… or just staring? Either works.",
                        "botName": "ATC",
                        "botAvatar": "https://files.bpcontent.cloud/2025/02/03/21/20250203211712-SGG6ZAZW.jpeg",
                        "botDescription": "ATC is designed to assist users by providing information, answering queries, and guiding them through relevant processes. It enhances user engagement by offering real-time responses, streamlining interactions, and improving user experience.",
                        "website": {},
                        "email": {
                          "title": "workwebdevtripathi736@gmail.com",
                          "link": "mailto:workwebdevtripathi736@gmail.com"
                        },
                        "phone": {
                          "title": "",
                          "link": ""
                        },
                        "termsOfService": {},
                        "privacyPolicy": {},
                        "color": "${isDarkMode ? "#170943" : "#000000"}",
                        "variant": "solid",
                        "themeMode": "${isDarkMode ? "dark" : "light"}",
                        "fontFamily": "ibm",
                        "radius": 2,
                        "additionalStylesheetUrl": "https://files.bpcontent.cloud/2025/02/03/21/20250203211412-J9TGCHVH.css",
                        "allowFileUpload": true
                      },
                      "clientId": "d58d7a5f-82c7-44d5-8533-83e5aafc9e65"
                    });
                  </script>
                </body>
              </html>
            `}
          ></iframe>
        </div>

        {/* Dark/Light Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            padding: "10px",
            backgroundColor: isDarkMode ? "#444" : "#ccc",
            color: isDarkMode ? "#E0E0E0" : "#121212",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "20px",
            transition: "transform 0.2s ease-in-out, background-color 0.3s ease",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          }}
          className="hover:scale-105"
        >
          {isDarkMode ? "🌙" : "🌞"}
        </button>

        {/* Back to Home Button */}
        <Button
          to="/"
          className={`absolute top-4 left-4 bg-transparent border-2 ${isDarkMode ? "border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white" : "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"} py-2 px-6 rounded-md`}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Chatbot;
