import { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CurrencyRate, CurrencyTable } from "@/types";

export default function Component() {
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrencyRates = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.nbp.pl/api/exchangerates/tables/A/"
      );
      const data: CurrencyTable[] = await response.json();
      setCurrencyRates(data[0].rates);
    } catch (error) {
      console.error("Error fetching currency rates:", error);
      setError("Failed to load currency rates.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrencyRates();
  }, [fetchCurrencyRates]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <Card>
        <CardHeader>
          <CardTitle>Currency Exchange Rates</CardTitle>
          <CardDescription>
            Real-time exchange rates from the National Bank of Poland (NBP)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Currency</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currencyRates.map((rate) => (
                <TableRow key={rate.code}>
                  <TableCell>{rate.currency}</TableCell>
                  <TableCell>{rate.code}</TableCell>
                  <TableCell className="font-medium">
                    {rate.mid.toFixed(4)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
