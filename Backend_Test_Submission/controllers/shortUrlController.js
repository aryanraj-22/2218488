const { nanoid } = require('nanoid');
const urlDB = new Map();

exports.createShortUrl = (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ message: "Invalid URL" });
  }

  const code = shortcode || nanoid(6);
  const expiry = new Date(Date.now() + validity * 60 * 1000).toISOString();

  urlDB.set(code, { url, expiry, clicks: [] });

  res.status(201).json({
    shortLink: `http://localhost:3000/${code}`,
    expiry,
  });
};

exports.redirect = (req, res) => {
  const data = urlDB.get(req.params.code);
  if (!data) return res.status(404).send("Not found");

  const expired = new Date(data.expiry) < new Date();
  if (expired) return res.status(410).send("Link expired");

  data.clicks.push({ time: new Date().toISOString(), source: req.headers.referer || "direct" });

  res.redirect(data.url);
};

exports.getStats = (req, res) => {
  const data = urlDB.get(req.params.code);
  if (!data) return res.status(404).json({ message: "Not found" });

  res.json({
    originalUrl: data.url,
    createdAt: data.createdAt,
    expiry: data.expiry,
    clicks: data.clicks
  });
};
