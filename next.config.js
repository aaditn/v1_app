/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        loader: "akamai",
        path: "",
    },
};
module.exports = {

    generateStaticParams: async () => {
      return [
        { route: '/' },
       
        // Add more routes as needed
      ];
    },
    output: 'export',
    
  };
  