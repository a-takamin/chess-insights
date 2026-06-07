import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker 用に最小構成のサーバ(.next/standalone)を出力する
  output: "standalone",
};

export default nextConfig;
