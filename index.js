const express = require('express');
// const router = express.Router();

const app = express();
app.use(express.json());

// GET
app.get('/', (req, res) => {
    try {
        res.status(200).json({ message: 'You are successfully connected :)' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on ${port}...`))