import { SERVICENOW } from "./axiosConfig";

export async function updateReceipts(sys_id: string, ctx) {
  SERVICENOW.defaults.headers.options = {
    "Content-Type": "application/json",
  };

  const RECEIPTS = {
    holder: "",
    payer: "",
    amount: "",
    instituition: "",
    receipt: sys_id,
  };

  const { data } = await SERVICENOW.post(process.env.RECEIPTS_URL!, RECEIPTS);

  return data;
}
