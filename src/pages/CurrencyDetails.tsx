import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { CurrencyDetails } from "@/types";
import Spinner from "@/components/Spinner";
import ChartComponent from "@/components/ChartComponent";
import { DateRangePicker } from "@/components/DateRangePicker";
import { useDateRange } from "@/context/DateRangeContext";

export default function CurrencyDetailsPage() {
  const { code } = useParams<{ code: string }>();
  const { dateRange } = useDateRange();
  const [currencyData, setCurrencyData] = useState<CurrencyDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrencyDetails = async () => {
    if (!dateRange?.from || !dateRange?.to) return;

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.nbp.pl/api/exchangerates/rates/A/${code}/${format(
          dateRange.from,
          "yyyy-MM-dd"
        )}/${format(dateRange.to, "yyyy-MM-dd")}/`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: CurrencyDetails = await response.json();
      setCurrencyData(data);
    } catch (error) {
      console.error("Error fetching currency details:", error);
      setError("Failed to load currency details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencyDetails();
  }, [code, dateRange]);

  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold">
        Details for {currencyData?.currency}
      </h1>
      <p>Code: {currencyData?.code}</p>
      <DateRangePicker />
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ChartComponent
          data={
            currencyData?.rates.map((rate) => ({
              effectiveDate: rate.effectiveDate,
              mid: rate.mid,
            })) || []
          }
        />
      )}
    </section>
  );
}
