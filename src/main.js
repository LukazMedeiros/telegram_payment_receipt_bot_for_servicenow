import { Telegraf } from "telegraf";
import { mkdtempSync, rmSync } from "fs";
import { getTelegramFileInfo } from "./getTelegramFileInfo.js";
import { downloadFile } from "./downloadFile.js";
import { sendFileToServiceNow } from "./sendFileToServiceNow.js";
import { updateReceiptsTable } from "./updateReceiptsTable.js";

export async function main(
  TELEGRAM_TOKEN,
  AXIOS_OPTIONS,
  ATTACHMENT_URL,
  TABLE_INFO,
  TABLE_URL
) {
  const BOT = new Telegraf(TELEGRAM_TOKEN);

  BOT.hears(/relatorio|relatório/gm, async (ctx) => {
    ctx.reply(
      "https://dev174442.service-now.com/sys_report_display.do?sysparm_report_id=b31fcd8a2fb1b1104b00e33df699b6e5"
    );
    return;
  });

  BOT.on("message", async (ctx) => {
    let TELEGRAM_MESSAGE = {
      user: {
        first_name: ctx?.update?.message?.from?.first_name,
        last_name: ctx?.update?.message?.from?.last_name,
      },
    };

    if (Object.keys(ctx.update.message).includes("photo")) {
      TELEGRAM_MESSAGE.file_id =
        ctx?.update?.message?.photo[
          ctx?.update?.message?.photo.length - 1
        ]?.file_id;
    }

    if (Object.keys(ctx.update.message).includes("document")) {
      TELEGRAM_MESSAGE.file_id = ctx?.update?.message?.document?.file_id;
    }

    TELEGRAM_MESSAGE.description = ctx?.update?.message?.caption?.split(/\n/gm);

    if (!TELEGRAM_MESSAGE.file_id || !TELEGRAM_MESSAGE.description) {
      ctx.reply(`Deve ser enviado comprovante com a legenda na seguinte estrutura:
      - Nome do titular da Fatura
      - Quem efetuou o pagamento
      - Valor da fatura
      - "Descrição" da fatura`);
      return;
    }

    const { FILE, URL } = await getTelegramFileInfo(
      TELEGRAM_TOKEN,
      TELEGRAM_MESSAGE.file_id
    );

    const TEMP_DIRECTORY = mkdtempSync("TEMP_");

    const DOWNLOAD_RESPONSE = await downloadFile(URL, TEMP_DIRECTORY, FILE);

    if (!DOWNLOAD_RESPONSE) {
      ctx.reply("erro ao efetuar o download do arquivo");
      return;
    }

    const { sys_id } = await sendFileToServiceNow(
      TEMP_DIRECTORY,
      URL,
      ATTACHMENT_URL,
      AXIOS_OPTIONS,
      TABLE_INFO
    );

    const RECEIPT_VALUE = {
      holder: TELEGRAM_MESSAGE.description[0],
      payer: TELEGRAM_MESSAGE.description[1],
      amount: TELEGRAM_MESSAGE.description[2]?.replace(",", "."),
      instituition: TELEGRAM_MESSAGE.description[3],
      receipt: sys_id,
    };

    const { result } = await updateReceiptsTable(
      TABLE_URL,
      RECEIPT_VALUE,
      AXIOS_OPTIONS
    );

    rmSync(TEMP_DIRECTORY, { recursive: true, force: true });

    ctx.reply(`[CRIADO NOVO REGISTRO] - Número: ${result.number}`);
    return;
  });

  BOT.launch();
}
