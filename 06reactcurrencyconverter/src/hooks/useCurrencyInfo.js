import { useCallback, useEffect, useState } from "react";
import {
    CURRENCY_API_CONFIG,
    normalizeCurrencyResponse,
} from "../config/currencyApi";

function useCurrencyInfo(currencyCode) {
    const normalizedCurrencyCode = String(currencyCode ?? "")
        .trim()
        .toLowerCase();

    const [rates, setRates] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [requestVersion, setRequestVersion] = useState(0);

    const retry = useCallback(() => {
        setRequestVersion((currentVersion) => currentVersion + 1);
    }, []);

    useEffect(() => {
        if (!normalizedCurrencyCode) {
            setRates({});
            setError("Choose a source currency before converting.");
            setIsLoading(false);
            return undefined;
        }

        const controller = new AbortController();

        async function fetchCurrencyRates() {
            setIsLoading(true);
            setError("");

            try {
                const response = await fetch(
                    CURRENCY_API_CONFIG.buildRatesUrl(normalizedCurrencyCode),
                    {
                        signal: controller.signal,
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `Unable to fetch rates. The API returned ${response.status}.`
                    );
                }

                const data = await response.json();
                const normalizedRates = normalizeCurrencyResponse(
                    data,
                    normalizedCurrencyCode
                );

                if (controller.signal.aborted) {
                    return;
                }

                setRates(normalizedRates);
            } catch (requestError) {
                if (requestError.name === "AbortError") {
                    return;
                }

                if (controller.signal.aborted) {
                    return;
                }

                setRates({});
                setError(
                    requestError.message ||
                    "Something went wrong while loading currency rates."
                );
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        fetchCurrencyRates();

        return () => {
            controller.abort();
        };
    }, [normalizedCurrencyCode, requestVersion]);

    const currencyOptions = Object.keys(rates).sort();

    return {
        rates,
        currencyOptions,
        isLoading,
        error,
        retry,
    };
}

export default useCurrencyInfo;