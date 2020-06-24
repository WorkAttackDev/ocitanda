const app = require("./src/app");

require("dotenv").config();

// const port = process.env.PORT || 5050;
const enviroment = process.env.NODE_ENV || "development";

if (enviroment === "development") {
	app.listen(port, () => {
		console.log(`Ocitanda API listening on portt ${port}`);
	});
} else {
	app.listen();
}
