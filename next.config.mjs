import mdxPlugin from "@next/mdx";

const withMDX = mdxPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withMDX(nextConfig);
