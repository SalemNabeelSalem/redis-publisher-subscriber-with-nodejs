import express from "express";
import bodyParser from "body-parser";
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

import NRP from "node-redis-pubsub";

const nrp = new NRP({
  PORT: 6379, // port of your locally running redis server.
  scope: "microservices", // // use a scope to prevent two NRPs from sharing messages.
});

app.get("/publish", (req, res) => {
  let receipt = {
    name: "Coffee",
    quantity: 1,
    totalPrice: 100,
  };

  nrp.emit("NEW_ORDER", receipt);

  console.log("NEW_ORDER", receipt);

  return res.status(200).json({ receipt });
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
