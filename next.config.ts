import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "yvownymnnedzmccdxhbk.supabase.co",
                pathname: "/storage/v1/object/public/logos/user/**",
            },
        ],
    },
};

export default nextConfig;
