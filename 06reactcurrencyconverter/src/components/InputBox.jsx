import { useId } from "react";

function InputBox({
  label = "Amount",
  amount = "",
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "",
  amountDisabled = false,
  currencyDisabled = false,
  isLoading = false,
}) {
  const generatedId = useId();
  const amountInputId = `${generatedId}-amount`;
  const currencySelectId = `${generatedId}-currency`;

  function handleAmountChange(event) {
    if (!onAmountChange) {
      return;
    }

    const { value } = event.target;

    if (value === "") {
      onAmountChange("");
      return;
    }

    const numericAmount = Number(value);

    if (!Number.isFinite(numericAmount)) {
      return;
    }

    onAmountChange(Math.max(0, numericAmount));
  }

  function handleCurrencyChange(event) {
    if (!onCurrencyChange) {
      return;
    }

    onCurrencyChange(event.target.value);
  }

  return (
    <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
      <div className="grid gap-5 md:grid-cols-[1fr_180px]">
        <div>
          <label
            htmlFor={amountInputId}
            className="block text-sm font-semibold text-slate-700"
          >
            {label} amount
          </label>

          <input
            id={amountInputId}
            type="number"
            min="0"
            value={amount}
            onChange={handleAmountChange}
            disabled={amountDisabled}
            className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-lg font-semibold text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
          />
        </div>

        <div>
          <label
            htmlFor={currencySelectId}
            className="block text-sm font-semibold text-slate-700"
          >
            Currency
          </label>

          <select
            id={currencySelectId}
            value={selectCurrency}
            onChange={handleCurrencyChange}
            disabled={currencyDisabled || isLoading}
            className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-lg font-semibold uppercase text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
          >
            {isLoading && <option value={selectCurrency}>Loading...</option>}

            {!isLoading &&
              currencyOptions.map((currencyCode) => (
                <option key={currencyCode} value={currencyCode}>
                  {currencyCode.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </div>
    </section>
  );
}

export default InputBox;
