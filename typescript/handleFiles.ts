import { mkdtempSync, rmSync } from "fs";
import { getTelegramFileInfo } from "./telegramFileInfo";
import { downloadFile } from "./downloadFile";
import { sendFileToServicenow } from "./sendFileToServicenow";
import { updateReceipts } from "./updateReceipts";

export async function handleFile(ctx, fileId: string) {
  try {
    const { FILE, URL } = await getTelegramFileInfo(fileId);

    const TEMP_DIRECTORY = mkdtempSync("TEMP-");

    const DOWNLOAD_RESULT = await downloadFile(URL!, TEMP_DIRECTORY, FILE);

    if (!DOWNLOAD_RESULT) {
      return "erro ao efetuar o download";
    }

    const { sys_id } = await sendFileToServicenow(FILE, TEMP_DIRECTORY);

    const { result } = await updateReceipts(sys_id, ctx);

    rmSync(TEMP_DIRECTORY, { recursive: true, force: true });

    return result;
  } catch (error) {}
}
