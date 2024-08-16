export const fetchCurrencyRates = async () => {
  const response = await fetch("https://api.nbp.pl/api/exchangerates/tables/A/");
  if (!response.ok) {
    throw new Error("Failed to fetch currency rates");
  }
  const data = await response.json();
  return data[0].rates;
};