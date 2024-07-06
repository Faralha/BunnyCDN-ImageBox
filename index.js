const express = require('express');
const app = express();
const port = 3000;

const { initWebRoutes } = require('./routes/index');


app.set('view engine', 'ejs');
app.use(express.static('public'));

initWebRoutes(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});