function formatNumber(value) {
  if (!Number.isFinite(Number(value))) {
    return "-";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
  }).format(Number(value));
}

function ConversionSummary({
  amount,
  fromCurrency,
  toCurrency,
  rate,
  convertedAmount,
}) {
  const hasRate = Number.isFinite(Number(rate));
  const hasConvertedAmount = Number.isFinite(Number(convertedAmount));

  return (
    <section
      className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm"
      aria-live="polite"
    >
      <h2 className="text-xl font-semibold text-slate-950">
        Conversion summary
      </h2>

      {hasRate ? (
        <div className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
          <p>
            <strong className="text-slate-950">
              {formatNumber(amount)} {fromCurrency.toUpperCase()}
            </strong>{" "}
            ={" "}
            <strong className="text-slate-950">
              {hasConvertedAmount ? formatNumber(convertedAmount) : "-"}{" "}
              {toCurrency.toUpperCase()}
            </strong>
          </p>

          <p>
            1 {fromCurrency.toUpperCase()} = {formatNumber(rate)}{" "}
            {toCurrency.toUpperCase()}
          </p>
        </div>
      ) : (
        <p className="mt-4 text-sm leading-6 text-slate-700">
          The selected exchange rate is not available yet.
        </p>
      )}
    </section>
  );
}

export default ConversionSummary;
