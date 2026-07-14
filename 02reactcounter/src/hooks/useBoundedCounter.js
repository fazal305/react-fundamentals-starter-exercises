import { useState } from "react";

function useBoundedCounter(min, max, initialValue = min) {
    const [value, setValue] = useState(initialValue);

    function increase() {
        setValue((currentValue) => {
            if (currentValue >= max) {
                console.log(`Counter cannot go above ${max}`);
                return currentValue;
            }

            return currentValue + 1;
        });
    }

    function decrease() {
        setValue((currentValue) => {
            if (currentValue <= min) {
                console.log(`Counter cannot go below ${min}`);
                return currentValue;
            }

            return currentValue - 1;
        });
    }

    return {
        value,
        increase,
        decrease,
    };
}

export default useBoundedCounter;