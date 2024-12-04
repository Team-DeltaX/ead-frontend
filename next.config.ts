import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Add the allowed hostname here
  },
};

export default nextConfig;
