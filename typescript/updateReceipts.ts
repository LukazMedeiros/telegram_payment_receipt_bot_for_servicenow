import { SERVICENOW } from "./axiosConfig";

export async function updateReceipts(sys_id: string, ctx) {
  SERVICENOW.defaults.headers.options = {
    "Content-Type": "application/json",
  };

  const RECEIPTS = {
    holder: "teste",
    payer: "teste",
    amount: "1",
    instituition: "teste",
    receipt: sys_id,
  };

  const { data } = await SERVICENOW.post(process.env.RECEIPTS_URL!, RECEIPTS);

  return data;
}
