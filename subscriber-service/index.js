import express from "express";
import bodyParser from "body-parser";
const app = express();
const PORT = 5400;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

import NRP from "node-redis-pubsub";

const nrp = new NRP({
  PORT: 6379, // port of your locally running redis server.
  scope: "microservices", // // use a scope to prevent two NRPs from sharing messages.
});

nrp.on("NEW_ORDER", (data) => {
  console.log("NEW_ORDER", data);
});

app.listen(PORT, () => {
  console.log(`subscriber server running at http://localhost:${PORT}`);
});
