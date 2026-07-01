module.exports = {
  apps: [
    {
      name: 'WebsiteTplus',
      script: 'serve',              // PM2 built-in static file server
      env: {
        PM2_SERVE_PATH: './dist',   // folder created by `npm run build`
        PM2_SERVE_PORT: 8080,       // port PM2 will serve on
        PM2_SERVE_SPA: 'true',      // required for Vue Router (SPA) routes
        PM2_SERVE_HOMEPAGE: '/index.html'
      },
      max_memory_restart: '500M'
    },
  ],
}