import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import express from "express";
import cors from "cors";
import { handleFile } from "./handleFiles";

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
  const result = await handleFile(ctx, ctx.update.message.document.file_id);

  return ctx.replyWithHTML(
    `mensagem de retorno de documentos ${JSON.stringify(result)}`
  );
});

BOT.on(message("photo"), async (ctx) => {
  const photoIndex = ctx.update.message.photo.length;
  const result = await handleFile(
    ctx,
    ctx.update.message.photo[photoIndex - 1].file_id
  );
  return ctx.replyWithHTML(
    `mensagem de retorno de foto ${JSON.stringify(result)}`
  );
});

BOT.launch();

SERVER.listen(process.env.PORT!);
