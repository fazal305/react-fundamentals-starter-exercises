# 06reactcurrencyconverter — Currency Converter

A React Fundamentals exercise using a custom hook to fetch and normalize currency data, reusable controlled components, stable list keys, safe state synchronization, and asynchronous loading/error handling.

## Learning Goals

- Understand why custom hooks exist.
- Package reusable asynchronous fetching logic into a custom hook.
- Keep API configuration centralized.
- Use controlled form inputs for amount and currency selection.
- Build one reusable `InputBox` component and render it twice.
- Use stable keys when rendering list options.
- Fetch currency data with the Fetch API.
- Cancel stale requests with `AbortController`.
- Normalize API responses before the UI consumes them.
- Show loading and error states.
- Convert currency with `amount * targetRate`.
- Swap related pieces of state safely.
- Avoid displaying `NaN`.
- Separate data logic from presentation.

## Concepts Covered

### Custom Hooks

A custom hook is a normal JavaScript function whose name starts with `use` and which can call other React hooks.

A custom hook does not create a special new React feature. It packages reusable hook-based logic so components can share behavior without duplicating state, effects, fetching, loading logic, error handling, or data transformation.

This project uses:

```javascript
const { rates, currencyOptions, isLoading, error, retry } =
  useCurrencyInfo(fromCurrency);
```

The component receives the result of the reusable logic without needing to know every detail of how the request is performed.

### useCurrencyInfo

`useCurrencyInfo` is the custom hook in this project.

It:

- Accepts a source currency code.
- Normalizes the currency code.
- Fetches rates from the configured API.
- Tracks `rates`, `isLoading`, and `error`.
- Uses `AbortController` to cancel stale requests.
- Validates the API response.
- Normalizes provider-specific data into a plain rates object.
- Returns sorted currency options from the available rate keys.
- Exposes a `retry` callback.

The hook returns data and functions, not JSX. Components render the UI.

### Controlled Components

The amount input and currency selects are controlled by React state.

```javascript
const [amount, setAmount] = useState(1);
const [fromCurrency, setFromCurrency] = useState("usd");
const [toCurrency, setToCurrency] = useState("pkr");
```

The UI values come from state, and user interaction updates that state through callbacks.

### Props-Driven Reusable Components

The project uses one `InputBox` component twice:

- Once for the source currency.
- Once for the target currency.

The same component behaves differently through props such as `label`, `amount`, `selectCurrency`, `amountDisabled`, and event callbacks.

This avoids duplicated `FromInputBox` and `ToInputBox` components.

### Source and Target Currency State

The source field must use source state:

```jsx
<InputBox
  selectCurrency={fromCurrency}
  onCurrencyChange={(currencyCode) => {
    setFromCurrency(currencyCode);
  }}
/>
```

The target field must use target state:

```jsx
<InputBox
  selectCurrency={toCurrency}
  onCurrencyChange={(currencyCode) => {
    setToCurrency(currencyCode);
  }}
/>
```

A common bug is passing `fromCurrency` to both fields. That makes both selects show the same value and breaks the meaning of source vs target currency.

Another bug is changing the amount when the user changes source currency:

```jsx
onCurrencyChange={() => setAmount(amount)}
```

That does not update the selected currency. The correct callback updates the currency state.

### Stable React Keys

Keys help React reconcile list items correctly and efficiently by preserving their identity between renders.

When rendering currency options:

```jsx
{
  currencyOptions.map((currencyCode) => (
    <option key={currencyCode} value={currencyCode}>
      {currencyCode.toUpperCase()}
    </option>
  ));
}
```

React uses keys to identify which item stayed, moved, appeared, disappeared, or updated.

Missing keys usually produce a warning rather than crashing the app. Keys should be unique among siblings. Stable database IDs are preferred when available. A stable unique currency code is appropriate here.

Array indexes are not preferred when list order can change.

### useEffect and API Fetching

`useEffect` runs after React commits a render.

In the custom hook, the effect runs whenever the normalized source currency changes:

```javascript
useEffect(() => {
  // Fetch rates for the selected source currency.
}, [normalizedCurrencyCode, requestVersion]);
```

Changing the source currency causes the hook to fetch new source-currency rates.

### AbortController

`AbortController` cancels fetch requests that are no longer needed.

If the user changes the source currency before an earlier request finishes, the cleanup function aborts the older request. This prevents a slower old response from overwriting newer currency data.

```javascript
const controller = new AbortController();

fetch(url, {
  signal: controller.signal,
});

return () => {
  controller.abort();
};
```

`AbortError` is expected during cancellation and should be ignored.

### Conversion Formula

The selected API returns rates relative to the selected source currency.

So the conversion formula is:

```javascript
convertedValue = numericAmount * Number(rates[toCurrency]);
```

Example:

```text
1 USD x USD-to-PKR rate = PKR result
```

Do not reverse the formula unless the API returns data in a different structure.

### Number Input Normalization

HTML input values arrive as strings.

The reusable input converts them:

```javascript
const numericAmount = Number(value);
```

It also handles an empty input separately:

```javascript
if (value === "") {
  onAmountChange("");
  return;
}
```

Invalid numbers are ignored, and negative amounts are clamped to `0`.

### Swap Logic

Swapping must exchange related state safely.

This project swaps:

- Source currency
- Target currency
- Editable amount
- Converted amount state

```javascript
const nextAmount = Number.isFinite(Number(convertedAmount))
  ? convertedAmount
  : amount;

setFromCurrency(toCurrency);
setToCurrency(fromCurrency);
setAmount(nextAmount);
setConvertedAmount(0);
```

It does not convert using stale rates in the same event. After `fromCurrency` changes, the hook fetches new source-currency rates. The user can convert again once rates are ready.

### API Response Validation

Do not assume every request succeeds or every response has the expected structure.

This project validates:

- HTTP response status
- Response object existence
- Rates object existence
- Numeric rate validity

Friendly errors are shown instead of allowing `undefined` or `NaN` to appear in the UI.

## API Reliability Note

Public currency APIs can change their response format, rate limits, authentication rules, or availability.

This project isolates provider-specific details inside `src/config/currencyApi.js` and normalizes responses inside the custom hook so the UI is not tightly coupled to one API provider.

Do not place secret API keys directly in committed frontend code. If a key-based provider is used, read the key through `import.meta.env.VITE_CURRENCY_API_KEY` and include only `.env.example` in the repository.

Vite frontend environment variables are bundled into client code, so they must not be treated as fully secret credentials.

## Project Structure

```text
06reactcurrencyconverter/
  src/
    components/
      InputBox.jsx
      ConversionSummary.jsx
      HookExplanation.jsx
    hooks/
      useCurrencyInfo.js
    config/
      currencyApi.js
    data/
      learningConcepts.js
    App.jsx
    main.jsx
    index.css
  .env.example
  index.html
  package.json
  vite.config.js
  README.md
```

## Components

### InputBox

A reusable controlled input component.

It renders an amount input and a currency select. It is used once for the source currency and once for the target currency.

### ConversionSummary

Displays the converted result and current exchange rate using `Intl.NumberFormat`.

It handles unavailable rates cleanly and avoids displaying `NaN`.

### HookExplanation

Renders concise learning cards from `src/data/learningConcepts.js`.

### useCurrencyInfo

The custom hook that handles currency fetching, loading state, errors, cancellation, response validation, and rate normalization.

## How To Run

```powershell
npm install
npm run dev
```

Then open the local URL Vite prints, usually:

```text
http://localhost:5173/
```

## Environment Setup

This project currently uses a public endpoint that does not require an API key.

If you switch to a key-based provider later:

```powershell
Copy-Item .env.example .env
```

Then add:

```text
VITE_CURRENCY_API_KEY=your_key_here
```

Remember: Vite frontend environment variables are still bundled into client code and must not be treated as fully secret credentials.

## Experiments To Try

- Change the default source currency.
- Change the default target currency.
- Add a third display-only conversion.
- Remove the custom hook and compare the duplicated logic.
- Add a favorites list using stable currency-code keys.
- Simulate a slow network request.
- Change source currency quickly and observe request cancellation.
- Add automatic conversion after amount changes.
- Add conversion-rate caching.
- Test an unsupported target currency.

## Lessons Learned

- Custom hooks are reusable functions that package hook-based logic.
- A custom hook can call React hooks such as `useState`, `useEffect`, and `useCallback`.
- Hooks should return reusable data and functions, not JSX.
- Controlled inputs keep form state in React.
- Props let one reusable component behave differently in different places.
- Source currency and target currency must be controlled by separate state values.
- The target field should use `selectCurrency={toCurrency}`.
- Changing source currency should call `setFromCurrency(currencyCode)`.
- Keys help React preserve list item identity during reconciliation.
- Stable unique currency codes are appropriate keys for currency options.
- Fetch logic belongs in the custom hook, not in presentational components.
- `AbortController` prevents stale requests from updating state after a newer request starts.
- API responses should be validated before the UI uses them.
- Currency conversion uses `amount * targetRate` when rates are relative to the source currency.
- HTML input values arrive as strings and must be normalized.
- Swapping related state should avoid using stale rates during the same event.
- Number formatting should be separate from conversion calculations.

## Future Improvements

- Cache recent rates.
- Add historical rates.
- Add favorite currency pairs.
- Add offline fallback data.
- Add conversion history.
- Add debounced automatic conversion.
- Add tests for the custom hook.
- Add a provider adapter system.
