const log = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  };
const haddleError = (req, res, next) => {
    res.status(500).send({ error: 'Internal server error' });
    next();
  }


module.exports = {log}