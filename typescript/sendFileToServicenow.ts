import { createReadStream } from "fs";
import { basename, resolve } from "path";
import { SERVICENOW } from "./axiosConfig";

export async function sendFileToServicenow(file: string, directory: string) {
  SERVICENOW.defaults.headers.options = {
    "Content-Type": "multipart/form-data",
  };

  const FILE_NAME = basename(file);
  const PATH = resolve(directory, FILE_NAME);

  const PAYLOAD = {
    table_name: process.env.TABLE_NAME!,
    table_sys_id: process.env.TABLE_SYS_ID!,
    file: createReadStream(PATH),
  };

  const { data } = await SERVICENOW.postForm(process.env.ATTACH_URL!, PAYLOAD);

  return data.result;
}
