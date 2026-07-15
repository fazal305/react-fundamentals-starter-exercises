import { useMemo, useState } from "react";
import ConversionSummary from "./components/ConversionSummary";
import HookExplanation from "./components/HookExplanation";
import InputBox from "./components/InputBox";
import { learningConcepts } from "./data/learningConcepts";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("pkr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { rates, currencyOptions, isLoading, error, retry } =
    useCurrencyInfo(fromCurrency);

  const targetRate = useMemo(() => {
    const rate = Number(rates[toCurrency]);

    return Number.isFinite(rate) ? rate : null;
  }, [rates, toCurrency]);

  const canConvert = !isLoading && !error && Number.isFinite(targetRate);

  function handleConvert() {
    const numericAmount = Number(amount);

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount < 0 ||
      !Number.isFinite(targetRate)
    ) {
      return;
    }

    setConvertedAmount(numericAmount * targetRate);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleConvert();
  }

  function handleSwap() {
    const nextAmount = Number.isFinite(Number(convertedAmount))
      ? convertedAmount
      : amount;

    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(nextAmount);
    setConvertedAmount(0);
  }

  function handleFromCurrencyChange(currencyCode) {
    setFromCurrency(currencyCode);
    setConvertedAmount(0);
  }

  function handleToCurrencyChange(currencyCode) {
    setToCurrency(currencyCode);
    setConvertedAmount(0);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            React Fundamentals
          </p>
          <h1 className="text-4xl font-bold text-slate-950">
            Currency Converter
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-700">
            Learning custom hooks, controlled components, stable keys,
            asynchronous data fetching, and reusable React architecture.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-300 bg-white/80 p-5 shadow-sm backdrop-blur"
        >
          <div className="space-y-4">
            <InputBox
              label="From"
              amount={amount}
              onAmountChange={setAmount}
              onCurrencyChange={handleFromCurrencyChange}
              currencyOptions={currencyOptions}
              selectCurrency={fromCurrency}
              isLoading={isLoading}
            />

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSwap}
                aria-label="Swap source and target currencies"
                className="rounded-full border border-slate-400 bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                Swap
              </button>
            </div>

            <InputBox
              label="To"
              amount={convertedAmount}
              onCurrencyChange={handleToCurrencyChange}
              currencyOptions={currencyOptions}
              selectCurrency={toCurrency}
              amountDisabled
              isLoading={isLoading}
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={!canConvert}
                className="rounded-md border border-slate-400 bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Convert
              </button>

              <div className="text-sm text-slate-700" aria-live="polite">
                {isLoading && "Loading exchange rates..."}
                {!isLoading && !error && targetRate && "Rates are ready."}
              </div>
            </div>

            {error && (
              <div
                className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-800"
                role="alert"
              >
                <p>{error}</p>
                <button
                  type="button"
                  onClick={retry}
                  className="mt-3 rounded-md border border-red-400 px-4 py-2 text-sm font-semibold text-red-900 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        </form>

        <ConversionSummary
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          rate={targetRate}
          convertedAmount={convertedAmount}
        />

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
              Stable key note
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Each currency option uses its unique currency code as a stable
              React key.
            </p>
          </article>

          <article className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
              State ownership note
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              The source and target selects are controlled by different state
              values: <code className="font-mono">fromCurrency</code> and{" "}
              <code className="font-mono">toCurrency</code>.
            </p>
          </article>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {learningConcepts.map((concept) => (
            <HookExplanation
              key={concept.id}
              title={concept.title}
              summary={concept.summary}
              projectUsage={concept.projectUsage}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;
