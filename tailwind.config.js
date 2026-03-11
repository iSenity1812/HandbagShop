/** @type {import('tailwindcss').Config} */
module.exports = {
  // Đảm bảo đường dẫn content bao gồm cả file của bạn
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")], // Thêm dòng này
  theme: {
    extend: {
      fontFamily: {
        body: "Alice_400Regular",
        display: "Quattrocento_700Bold",
      },
    },
  },
  plugins: [],
};
