const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/ers',
    createProxyMiddleware({
      target: 'http://localhost:8080', // 포트 번호를 8080으로 변경
      changeOrigin: true,
    })
  );
};
