import "dotenv/config.js";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import router from "./routes/route.js";
const app = express();

mongoose.set('strictQuery', false);
// DB connection
mongoose.connect(`${process.env.MONGO_DB}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	//don't show the log when it is test
	if (process.env.NODE_ENV !== "test") {
		console.log("Connected");
		console.log("App is running ... \n");
	}
})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});

var db = mongoose.connection;

app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '/')));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// // simple route
// app.get("/", (req, res) => {
// 	res.json({ message: "Welcome to student application." });
// });

app.use('/api/v1/', router);

// set port, listen for requests
const PORT = process.env.PORT || 8000;

// if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});
// }
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});