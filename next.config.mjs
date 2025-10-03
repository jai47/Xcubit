/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {},
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.xcubit.in',
            },
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
            },
        ],
    },
};

export default nextConfig;
