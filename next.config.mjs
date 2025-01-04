/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/board',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
