import axios from "axios";
import { basename } from "path";

export async function getTelegramFileInfo(fileId: string) {
  const { data } = await axios.get(
    `https://api.telegram.org/bot${process.env.TOKEN}/getFile?file_id=${fileId}`
  );

  const { config } = await axios.get(
    `https://api.telegram.org/file/bot${process.env.TOKEN}/${data.result.file_path}`
  );

  const FILE = basename(config.url!);
  const URL = config.url;

  return { FILE, URL };
}
