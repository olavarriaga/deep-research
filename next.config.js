/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: blob:;
              font-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              block-all-mixed-content;
              upgrade-insecure-requests;
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig 