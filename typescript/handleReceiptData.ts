export function handleReceiptData(data: any) {
  const arrayData = data.split(/\n/g);

  if (arrayData.length < 4) {
    throw new Error("informações inválidas!");
  }

  arrayData.forEach((element: string) => {
    if (!element || element == "") {
      throw new Error("informações inválidas!");
    }
  });

  if (!/^(\d*)(\,|\.)(\d{2})$/.exec(arrayData[2])) {
    throw new Error("informações inválidas!");
  }
  return {
    holder: arrayData[0],
    payer: arrayData[1],
    amount: arrayData[2].replace(",", "."),
    instituition: arrayData[3],
  };
}
