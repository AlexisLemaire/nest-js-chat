const express = require('express');
const app = express();

app.use(express.static('./dist/frontend-angular/'));
app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: './dist/frontend-angular/'} );
});
app.listen(process.env.PORT || 8080);