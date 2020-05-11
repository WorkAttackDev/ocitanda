const ghpages = require("gh-pages");

ghpages.publish(
	"__sapper__/export",
	{
		branch: "gh-pages",
		repo: "https://github.com/DoopLine/wab.git",
		user: {
			name: "DoopLine",
			email: "denilson2770@gmail.com",
		},
	},
	() => {
		console.log("Deploy Complete!");
	}
);
