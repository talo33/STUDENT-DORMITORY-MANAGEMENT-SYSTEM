/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      minHeight: {
        'custom-body': 'calc(100vh - 80px - 54px)'
      },
      backgroundImage: {
        about:
          'url("https://ss-images.saostar.vn/wwebp700/2019/02/21/4634692/39744784_1414337092032482_2152388264428830720_o.jpg") !important'
      }
    }
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ]
};
