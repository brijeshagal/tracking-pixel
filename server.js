const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve pixel and track opens
app.get('/track/:userId', (req, res) => {
    const { userId } = req.params;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const timeOpened = new Date().toISOString();

    // Log or store this data
    console.log(`[OPEN] User: ${userId} | IP: ${ip} | Time: ${timeOpened} | UA: ${userAgent}`);

    const pixelPath = path.join(__dirname, 'public', 'test-visible.png');
    const img = fs.readFileSync(pixelPath);

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(img);
});

app.listen(PORT, () => {
    console.log(`📡 Tracking server running at http://localhost:${PORT}`);
});
