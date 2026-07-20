/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages serves a prebuilt static site out of `out/`.
  output: "export",
  // Directory-style URLs so Pages resolves /en/about to /en/about/index.html.
  trailingSlash: true,
  // No image optimisation server exists in a static export.
  images: {
    unoptimized: true
  }
};

export default nextConfig;
