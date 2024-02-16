const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/weather/current', async (req, res) => {
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=Vigo,es&units=metric&appid=ee3c7d3377bf7679b9c8b4c79696249d`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener el clima actual' });
    }
});

app.get('/weather/forecast', async (req, res) => {
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=Vigo,es&units=metric&appid=ee3c7d3377bf7679b9c8b4c79696249d`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener la previsión del tiempo' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

