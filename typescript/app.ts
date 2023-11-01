import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import express from "express";
import cors from "cors";
import { downloadFile } from "./downloadFile";
import { mkdtempSync } from "fs";
import { getTelegramFileInfo } from "./telegramFileInfo";
import { sendFileToServicenow } from "./sendFileToServicenow";
import { updateReceipts } from "./updateReceipts";

const SERVER = express();
SERVER.use(cors());

SERVER.get("/", (request, response) => {
  const message = {
    status: "server UP",
    timestamp: new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    }),
  };
  return response.json(message);
});

const BOT = new Telegraf(process.env.TOKEN!);

BOT.start((ctx) => {
  return ctx.replyWithHTML("mensagem de boas vindas");
});

BOT.help((ctx) => {
  {
    return ctx.replyWithHTML("mensagem de ajuda");
  }
});

BOT.command("novo", (ctx) => {
  return ctx.replyWithHTML("mensagem comando novo");
});

BOT.command("relatorios", (ctx) => {
  return ctx.replyWithHTML("mensagem comando relatorios");
});

BOT.on(message("document"), async (ctx) => {
  //
  try {
    const { FILE, URL } = await getTelegramFileInfo(
      ctx.update.message.document.file_id
    );
    const TEMP_DIRECTORY = mkdtempSync("TEMP-");

    const downloadResult = await downloadFile(URL!, TEMP_DIRECTORY, FILE);
    if (!downloadResult) {
      return ctx.replyWithHTML("erro ao efetuar o download do arquivo");
    }

    const { sys_id } = await sendFileToServicenow(FILE, TEMP_DIRECTORY);

    const { result } = await updateReceipts(sys_id, ctx);
    console.log(sys_id);
  } catch (error) {}

  //

  return ctx.replyWithHTML("mensagem de retorno de documentos");
});

BOT.on(message("photo"), async (ctx) => {
  return ctx.replyWithHTML("mensagem de retorno de foto");
});

BOT.launch();

SERVER.listen(process.env.PORT!);
