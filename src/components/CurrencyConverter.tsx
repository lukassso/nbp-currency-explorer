import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import debounce from "lodash.debounce";
import { ExchangeRates } from "@/types";
import { ArrowLeftRightIcon } from "lucide-react";
import { fetchCurrencyRates } from "@/utils/api";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(100);
  const [isSourcePLN, setIsSourcePLN] = useState<boolean>(true);
  const [variableCurrency, setVariableCurrency] = useState<string>("USD");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [isRotating, setIsRotating] = useState<boolean>(false);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const rates = await fetchCurrencyRates();
        const ratesObject = rates.reduce(
          (acc: ExchangeRates, rate: { code: string; mid: number }) => {
            acc[rate.code] = rate.mid;
            return acc;
          },
          { PLN: 1 }
        );

        setExchangeRates(ratesObject);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleVariableCurrencyChange = useCallback((value: string) => {
    setVariableCurrency(value);
  }, []);

  const debouncedHandleAmountChange = useCallback(
    debounce((value: string) => {
      setAmount(Number(value));
    }, 100),
    []
  );

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedHandleAmountChange(e.target.value);
  };

  const handleCurrencySwap = useCallback(() => {
    setIsRotating(true);
    setIsSourcePLN(!isSourcePLN);

    setTimeout(() => {
      setIsRotating(false);
    }, 500); 
  }, [isSourcePLN]);

  const convertedAmount = useMemo(() => {
    if (isSourcePLN) {
      const targetRate = exchangeRates[variableCurrency] || 1;
      return amount * targetRate;
    } else {
      const sourceRate = exchangeRates[variableCurrency] || 1;
      return amount / sourceRate;
    }
  }, [amount, isSourcePLN, variableCurrency, exchangeRates]);

  return (
    <Card className="w-full max-w-lg mx-auto mb-6 ml-0 overflow-hidden">
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
        <CardDescription>
          Convert between Polish Zloty (PLN) and other currencies.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-[1fr_auto_auto_1fr] gap-2">
          <Input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="rounded-r-none min-w-[80px]"
          />

          {isSourcePLN ? (
            <>
              <Select value="PLN" disabled>
                <SelectTrigger className="rounded-none min-w-[100px]">
                  <SelectValue placeholder="PLN">PLN</SelectValue>
                </SelectTrigger>
              </Select>
              <Button
                variant="link"
                onClick={handleCurrencySwap}
                className={isRotating ? "rotate-180" : ""}
              >
                <ArrowLeftRightIcon className="h-4 w-4" />
              </Button>
              <Select
                value={variableCurrency}
                onValueChange={handleVariableCurrencyChange}
              >
                <SelectTrigger className="rounded-l-none min-w-[100px]">
                  <SelectValue placeholder="To" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(exchangeRates).map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          ) : (
            <>
              <Select
                value={variableCurrency}
                onValueChange={handleVariableCurrencyChange}
              >
                <SelectTrigger className="rounded-none min-w-[100px]">
                  <SelectValue placeholder="From" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(exchangeRates).map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="link"
                onClick={handleCurrencySwap}
                className={isRotating ? "rotate-180" : ""}
              >
                <ArrowLeftRightIcon className="h-4 w-4" />
              </Button>
              <Select value="PLN" disabled>
                <SelectTrigger className="rounded-l-none min-w-[100px]">
                  <SelectValue placeholder="PLN">PLN</SelectValue>
                </SelectTrigger>
              </Select>
            </>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-medium">
            {convertedAmount.toFixed(2)}{" "}
            {isSourcePLN ? variableCurrency : "PLN"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
