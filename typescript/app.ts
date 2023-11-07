import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import express from "express";
import cors from "cors";
import { handleFile } from "./handleFiles";
import { handleReceiptData } from "./handleReceiptData";

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
  const message = `Envie o arquivo do comprovante com a legenda na seguinte estrutura:
•	nome do titular da fatura
•	nome de quem efetuou o pagamento
•	valor da fatura ex: 9999,99
•	descrição da fatura ex: companhia elétrica
`;
  return ctx.replyWithHTML(message);
});

BOT.command("relatorios", (ctx) => {
  return ctx.replyWithHTML("mensagem comando relatorios");
});

BOT.on(message("document"), async (ctx) => {
  try {
    const data = handleReceiptData(ctx.update.message.caption);
    const result = await handleFile(data, ctx.update.message.document.file_id);

    return ctx.replyWithHTML(`[NOVO REGISTRO] - ${result.number}`);
  } catch (error) {
    return ctx.replyWithHTML(`Ocorreu um erro ${error}`);
  }
});

BOT.on(message("photo"), async (ctx) => {
  try {
    const photoIndex = ctx.update.message.photo.length;
    const data = handleReceiptData(ctx.update.message.caption);
    const result = await handleFile(
      data,
      ctx.update.message.photo[photoIndex - 1].file_id
    );

    return ctx.replyWithHTML(`[NOVO REGISTRO] - ${result.number}`);
  } catch (error) {
    return ctx.replyWithHTML(`Ocorreu um erro ${error}`);
  }
});

BOT.launch();

SERVER.listen(process.env.PORT!);
