import { SERVICENOW } from "./axiosConfig";

export async function updateReceipts(sys_id: string, ctx: any) {
  SERVICENOW.defaults.headers.options = {
    "Content-Type": "application/json",
  };

  ctx.receipt = sys_id;

  const { data } = await SERVICENOW.post(process.env.RECEIPTS_URL!, ctx);

  return data;
}
