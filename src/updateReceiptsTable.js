import axios from "axios";

export async function updateReceiptsTable(url, receipt, options) {
  options.headers = { "Content-Type": "application/json" };

  const { data } = await axios.post(url, receipt, options);

  return data;
}
