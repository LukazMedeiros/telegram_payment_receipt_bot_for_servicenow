import axios from "axios";
import path from "path";

export async function getTelegramFileInfo(TELEGRAM_TOKEN, fileId) {
  const { data } = await axios.get(
    `https://api.telegram.org/bot${TELEGRAM_TOKEN}/getFile?file_id=${fileId}`
  );

  const { config } = await axios.get(
    `https://api.telegram.org/file/bot${TELEGRAM_TOKEN}/${data.result.file_path}`
  );

  const FILE = path.basename(config.url);
  const URL = config.url;

  return { FILE, URL };
}
