import { basename, resolve } from "path";
import { createReadStream } from "fs";
import axios from "axios";

export async function sendFileToServiceNow(
  directory,
  file,
  url,
  options,
  table
) {
  const FILE_NAME = basename(file);
  options.headers = { "Content-Type": "multipart/form-data" };
  const PATH = resolve(directory, FILE_NAME);

  const PAYLOAD = {
    table_name: table.table_name,
    table_sys_id: table.table_sys_id,
    file: createReadStream(PATH),
  };

  const { data } = await axios.postForm(url, PAYLOAD, options);
  return data.result;
}
