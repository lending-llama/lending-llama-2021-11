import proxy from 'http2-proxy';

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: '/',
    src: '/dist'
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-postcss',
  ],
  routes: [
    {
      src: '/api/.*',
      dest: (req, res) => {
        req.url = req.url.replace(/^\/api/, ''); // remove /api prefix
        return proxy.web(req, res, {
          hostname: 'localhost',
          port: 8080,
        });
      },
    },
  ],
  devOptions: {
    port: 8081,
    open: 'none',

    tailwindConfig: './tailwind.config.js',
  },
};
