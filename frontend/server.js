const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(__dirname));

// Handle SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Frontend server running on http://localhost:${PORT}`);
});
