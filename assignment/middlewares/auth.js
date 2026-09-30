module.exports = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== '12345') {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid API Key' });
    }
    next();
};