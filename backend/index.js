const app = require('./src/app');

require('dotenv').config();

const port = process.env.PORT || 5050;

app.listen(port, () => {
	console.log(`Ocitanda API listening on portt ${port}`);
});
