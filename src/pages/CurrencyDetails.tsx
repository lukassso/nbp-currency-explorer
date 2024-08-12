import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CurrencyDetails } from "@/types";
import Spinner from "@/components/Spinner";

export default function CurrencyDetailsPage() {
  const { code } = useParams<{ code: string }>();
  const [currencyData, setCurrencyData] = useState<CurrencyDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencyDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.nbp.pl/api/exchangerates/rates/A/${code}/`
        );
        const data: CurrencyDetails = await response.json();
        setCurrencyData(data);
      } catch (error) {
        console.error("Error fetching currency details:", error);
        setError("Failed to load currency details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencyDetails();
  }, [code]);

  if (loading) {
    return <Spinner />;
  }
  if (error) return <div>{error}</div>;

  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold">
        Details for {currencyData?.currency}
      </h1>
      <p>Code: {currencyData?.code}</p>
      <h2 className="text-2xl font-bold mt-4">Rates</h2>
      <ul>
        {currencyData?.rates.map((rate, index) => (
          <li key={index} className="mb-2">
            <p>Date: {rate.effectiveDate}</p>
            <p>Rate: {rate.mid.toFixed(4)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
