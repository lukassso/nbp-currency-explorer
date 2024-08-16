import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { CurrencyRate } from "@/types";
import { Link } from "react-router-dom";
import Spinner from "@/components/Spinner";
import CurrencyConverter from "@/components/CurrencyConverter";
import { fetchCurrencyRates } from "@/utils/api";

export default function HomePage() {
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const rates = await fetchCurrencyRates();
        setCurrencyRates(rates);
      } catch (error) {
        console.error("Error fetching currency rates:", error);
        setError("Failed to load currency rates.");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <CurrencyConverter />
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
                  <TableCell>
                    <Link to={`/currency/${rate.code}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
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
