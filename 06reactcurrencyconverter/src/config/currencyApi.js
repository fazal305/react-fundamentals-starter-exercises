export const CURRENCY_API_CONFIG = {
    baseUrl:
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies",

    buildRatesUrl(currencyCode) {
        return `${this.baseUrl}/${currencyCode}.json`;
    },
};

// Public APIs can change, become unavailable, enforce rate limits, or require keys.
// Keep provider-specific details here so the app and hook are easier to update later.
export function normalizeCurrencyResponse(data, currencyCode) {
    const normalizedCurrencyCode = currencyCode.trim().toLowerCase();

    if (!data || typeof data !== "object") {
        throw new Error("The currency API returned an empty response.");
    }

    const rawRates = data[normalizedCurrencyCode];

    if (!rawRates || typeof rawRates !== "object") {
        throw new Error("The currency API returned an unexpected response format.");
    }

    const normalizedRates = {};

    Object.entries(rawRates).forEach(([code, rate]) => {
        const normalizedCode = code.trim().toLowerCase();
        const numericRate = Number(rate);

        if (normalizedCode && Number.isFinite(numericRate) && numericRate > 0) {
            normalizedRates[normalizedCode] = numericRate;
        }
    });

    if (!normalizedRates[normalizedCurrencyCode]) {
        normalizedRates[normalizedCurrencyCode] = 1;
    }

    if (Object.keys(normalizedRates).length === 0) {
        throw new Error("No valid currency rates were found.");
    }

    return normalizedRates;
}