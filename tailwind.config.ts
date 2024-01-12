import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#0060FF',
        lightblue: '#DFEBFF',
        graytext: '#acacac',
        lightgray: "#f1f0f0",
        prime: '#212529',
        secondary: '#343a40',
        buttonPrimary: '#d90429'
      }
    },
  },
  plugins: [],
}
export default config
