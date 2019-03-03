// app.js

const express = require("express");
const data = require("./data.json");

const app = express();
//const router = express.Router();

//handler for invalid routes
const lostError = (req, res, next) => {
	const message = "You look lost";
	const err = new Error(message);
	err.status = 404;
	next(err);
}

app.set("view engine", "pug");
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
	res.locals.projects = data.projects;
	res.render("index");
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.get("/projects/:id", (req, res, next) => {
	const id = parseInt(req.params.id, 10);
	res.locals.project = data.projects.find(p => p.id === id);
	if(res.locals.project) {
		res.render("project");
	} else {
		//if no project has that id, return 404
		lostError(req, res, next)
	}
	
});

app.use(lostError);

app.use((err, req, res, next) => {
	res.locals.error = err;
	res.render("error");
});

app.listen(process.env.PORT || 3000, () => {
	//console.log("Served up at localhost:3000!");
});
