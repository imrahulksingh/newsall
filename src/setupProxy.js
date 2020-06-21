const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  //check configuration in /src/components/Home/nwesapi.json file and configure proxy for each entry

  //##############  TOP STORIES PROXIES STARTS  ####################
  //1
  app.use(
    createProxyMiddleware("/rssfeedstopstories.cms", {
      target: "https://economictimes.indiatimes.com",
      // source: false,
      // changeOrigin: true,
    })
  );
  //2
  app.use(
    createProxyMiddleware("/rss/1206584", {
      target: "https://www.indiatoday.in",
      // source: false,
      // changeOrigin: true,
    })
  );
  //3
  app.use(
    createProxyMiddleware("/rss/topnews", {
      target: "https://www.hindustantimes.com",
      // source: false,
      // changeOrigin: true,
    })
  );
  //4
  app.use(
    createProxyMiddleware("/rss/news", {
      target: "https://www.livemint.com",
      // source: false,
      // changeOrigin: true,
    })
  );
  //5
  app.use(
    createProxyMiddleware("/feeds", {
      target: "https://www.dnaindia.com",
      // source: false,
      // changeOrigin: true,
    })
  );
  //6
  app.use(
    createProxyMiddleware("/rss/india.xml", {
      target: "https://www.firstpost.com",
      source: false,
      changeOrigin: true,
    })
  );
  //7
  app.use(
    createProxyMiddleware("/rss/india-national-news.xml", {
      target: "https://zeenews.india.com",
      source: false,
      changeOrigin: true,
    })
  );
  //8
  app.use(
    createProxyMiddleware("/rss.xml", {
      target: "https://www.thenewsminute.com",
      source: false,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/rss-feeds", {
      target: "http://ddnews.gov.in",
      source: false,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/rss/latest.rss", {
      target: "https://www.business-standard.com/",
      // source: false,
      // changeOrigin: true,
    })
  );
  // app.use(
  //   createProxyMiddleware("/rss/feed/category/national/politics.xml", {
  //     target: "https://www.aninews.in",
  //     source: false,
  //     changeOrigin: true,
  //   })
  // );
  //##############  TOP STORIES PROXIES ENDS  ####################
  //##############  OPINION PROXIES STARTS  ####################
  app.use(
    createProxyMiddleware("/opinion/feeder/default.rss", {
      target: "https://www.thehindu.com",
      source: false,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/rss/subsection/5", {
      target: "https://www.outlookindia.com",
      source: false,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/rss/opinion/rssfeed.xml", {
      target: "https://www.hindustantimes.com",
      source: false,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/opinion/rssfeeds/897228639.cms", {
      target: "https://economictimes.indiatimes.com",
      source: false,
      changeOrigin: true,
    })
  );
  //##############  OPINION PROXIES STARTS  ####################
};
