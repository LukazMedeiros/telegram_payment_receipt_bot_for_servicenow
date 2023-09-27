import { config } from "dotenv";
import { main } from "./src/main.js";
import { createServer } from "http";

config();

createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.send("it is running\n");
}).listen(process.env.PORT);

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const ATTACHMENT_URL = process.env.ATTACHMENT_URL;
const TABLE_URL = process.env.TABLE_URL;

const TABLE_INFO = {
  table_name: process.env.TABLE_NAME,
  table_sys_id: process.env.TABLE_SYS_ID,
};

const AXIOS_OPTIONS = {
  auth: {
    username: process.env.USER,
    password: process.env.PASSWORD,
  },
};

main(TELEGRAM_TOKEN, AXIOS_OPTIONS, ATTACHMENT_URL, TABLE_INFO, TABLE_URL);
