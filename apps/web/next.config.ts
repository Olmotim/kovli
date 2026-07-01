import type { NextConfig } from "next";
import path from "path";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
