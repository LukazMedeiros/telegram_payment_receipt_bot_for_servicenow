import { createWriteStream } from "fs";
import path from "path";
import { get } from "https";

export async function downloadFile(url, directory, file) {
  return new Promise((resolve, reject) => {
    const LOCAL_FILE = createWriteStream(path.resolve(directory, file));

    get(url, (response) => {
      response.pipe(LOCAL_FILE);

      LOCAL_FILE.on("finish", () => resolve(true));
      LOCAL_FILE.on("error", () => reject(false));
    });
  });
}
