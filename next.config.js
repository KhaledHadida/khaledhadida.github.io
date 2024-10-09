/** @type {import('next').NextConfig} */


const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    assetPrefix: isProd ? '/khaledhadida.github.io/' : '',
    images: {
      unoptimized: true,
    },
    trailingSlash: true, 
  };

//const nextConfig = {}
//module.exports = nextConfig
