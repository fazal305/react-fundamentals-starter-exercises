# 05reactpasswordgenerator — Password Generator

A React Fundamentals exercise using useState, useCallback, useEffect, and useRef to build a configurable password generator with clipboard support and visible interaction feedback.

## Learning Goals

- Use `useState` for values that affect the rendered UI.
- Use `useCallback` to memoize function references.
- Understand that `useCallback` does not automatically call a function.
- Use `useEffect` for post-commit synchronization.
- Use effect cleanup to clear pending timers.
- Use `useRef` to reference a real input element.
- Generate a password from a configurable character source.
- Use the correct zero-based random index calculation.
- Copy text with the Clipboard API.
- Understand that selecting input text and choosing clipboard payload are separate.
- Use controlled form inputs with `onChange`.
- Use real button actions with `onClick`.

## Concepts Covered

### useState

`useState` stores values that affect the rendered UI.

This project uses state for:

```javascript
const [password, setPassword] = useState("");
const [length, setLength] = useState(12);
const [numberAllowed, setNumberAllowed] = useState(false);
const [characterAllowed, setCharacterAllowed] = useState(false);
const [isCopied, setIsCopied] = useState(false);
```

Changing these values schedules a React re-render. The UI updates because the next render reads the new state values.

### useCallback

`useCallback` returns a memoized function reference.

It does not call the function automatically.

```javascript
const generatePassword = useCallback(() => {
  // This code runs only when generatePassword() is called.
}, [length, numberAllowed, characterAllowed]);
```

React reuses the previous function reference until one of the dependencies changes.

In this project, `generatePassword` receives a new function reference when one of these values changes:

- `length`
- `numberAllowed`
- `characterAllowed`

`useCallback` is not a magic performance button. It is useful when a stable function reference matters, such as when a function is passed to a memoized child component, used by another hook, or would otherwise trigger avoidable work.

Here it is used mainly to teach stable function references and hook dependency behavior.

### useEffect

`useEffect` runs after React commits a render.

It can run:

- After the first committed render
- After listed dependencies change
- Cleanup before the effect runs again
- Cleanup when the component unmounts

This project uses one effect to regenerate the password:

```javascript
useEffect(() => {
  generatePassword();
}, [generatePassword]);
```

That means: run after the first committed render and again whenever the `generatePassword` reference changes.

It also uses another effect to reset copied feedback:

```javascript
useEffect(() => {
  if (!isCopied) {
    return undefined;
  }

  const timeoutId = window.setTimeout(() => {
    setIsCopied(false);
  }, 1500);

  return () => {
    window.clearTimeout(timeoutId);
  };
}, [isCopied]);
```

Cleanup matters because it clears pending timers before the effect runs again or the component unmounts.

### useRef

`useRef` can hold a mutable value across renders without causing another render.

It can also reference a real DOM element rendered by React:

```javascript
const passwordInputRef = useRef(null);
```

```jsx
<input ref={passwordInputRef} />
```

This project uses the ref to focus and select the password input:

```javascript
passwordInputRef.current?.focus();
passwordInputRef.current?.select();
```

Updating `ref.current` does not trigger a re-render.

### useEffect vs useCallback Dependencies

`useEffect` dependencies decide when the effect should run again:

```javascript
useEffect(() => {
  generatePassword();
}, [generatePassword]);
```

Meaning:

```text
Run the effect after the first committed render and whenever the generatePassword reference changes.
```

`useCallback` dependencies decide when React should create a new memoized function reference:

```javascript
const generatePassword = useCallback(() => {
  // Logic
}, [length, numberAllowed, characterAllowed]);
```

Meaning:

```text
Reuse the previous function reference unless one of these values changes.
```

### Stable State Setters

React guarantees that state setter functions have stable identities.

That means `setPassword` does not need to be included in this dependency array:

```javascript
const generatePassword = useCallback(() => {
  setPassword(generatedPassword);
}, [length, numberAllowed, characterAllowed]);
```

Omitting it does not create a stale closure or break the callback.

### Password Generation Algorithm

This project starts with letters:

```javascript
let characterSource = LETTERS;
```

Then conditionally adds numbers and special characters:

```javascript
if (numberAllowed) {
  characterSource += NUMBERS;
}

if (characterAllowed) {
  characterSource += SPECIAL_CHARACTERS;
}
```

Then it generates exactly `length` characters:

```javascript
for (let index = 0; index < length; index += 1) {
  const randomIndex = Math.floor(Math.random() * characterSource.length);

  generatedPassword += characterSource[randomIndex];
}
```

Starting the loop from `0` is clear because it runs exactly `length` times.

### The Random Index +1 Bug

This is wrong:

```javascript
const randomIndex = Math.floor(Math.random() * characterSource.length) + 1;
```

It skips index `0`.

It can also produce an out-of-range index equal to `characterSource.length`.

For a string with length `4`:

```text
Math.random() gives a value from 0 inclusive to 1 exclusive.
Multiplying by 4 gives a value from 0 inclusive to 4 exclusive.
Math.floor() gives 0, 1, 2, or 3.
```

Those are all valid indexes. Adding `1` would produce `1`, `2`, `3`, or `4`, and index `4` is invalid.

### Clipboard Selection vs Clipboard Payload

Selecting text in the input and copying text to the clipboard are separate operations.

This selects visible text inside the input:

```javascript
passwordInputRef.current?.select();
```

This chooses what actually gets copied:

```javascript
await navigator.clipboard.writeText(password);
```

Even if you selected only the first three visible characters with:

```javascript
passwordInputRef.current?.setSelectionRange(0, 3);
```

this would still copy the full password:

```javascript
await navigator.clipboard.writeText(password);
```

To copy only part of the password, calculate and pass that substring:

```javascript
const selectedText = password.slice(0, 3);
await navigator.clipboard.writeText(selectedText);
```

The Clipboard API usually requires a secure context such as HTTPS, or localhost during development, and a direct user action such as clicking a button. Clipboard calls can fail, so this project uses `try...catch`.

### JavaScript Strings Are Immutable

JavaScript strings are immutable and do not have a `splice()` method.

This is wrong:

```javascript
password.splice(0, 3);
```

`splice()` belongs to arrays.

Use `slice()` or `substring()` to extract part of a string:

```javascript
const firstThreeCharacters = password.slice(0, 3);
```

### onClick and onChange

`onClick` handles click interactions:

```jsx
<button onClick={copyPasswordToClipboard}>Copy</button>
```

`onChange` handles changes to form controls such as ranges and checkboxes:

```jsx
<input
  type="range"
  value={length}
  onChange={(event) => setLength(Number(event.target.value))}
/>
```

```jsx
<input
  type="checkbox"
  checked={numberAllowed}
  onChange={(event) => setNumberAllowed(event.target.checked)}
/>
```

## Security Learning Note

`Math.random()` is acceptable for this learning exercise, but it is not the best choice for generating security-sensitive passwords.

A production password generator should prefer the Web Crypto API, such as `crypto.getRandomValues()`, for cryptographically stronger randomness.

This project keeps `Math.random()` because the main learning goal is React hooks.

## Project Structure

```text
05reactpasswordgenerator/
  src/
    components/
      PasswordDisplay.jsx
      PasswordOptions.jsx
      HookExplanation.jsx
    data/
      hookConcepts.js
    App.jsx
    main.jsx
    index.css
  index.html
  package.json
  vite.config.js
  README.md
```

## Components

### PasswordDisplay

Displays the generated password in a read-only input.

It receives the password, input ref, copied state, copy handler, and regenerate handler through props. It does not generate passwords itself.

### PasswordOptions

Renders controlled form inputs for password length, number inclusion, and special-character inclusion.

It uses `onChange` and sends normalized values back to the parent.

### HookExplanation

Renders teaching cards for `useState`, `useCallback`, `useEffect`, and `useRef`.

The content comes from `src/data/hookConcepts.js`.

## How To Run

```powershell
npm install
npm run dev
```

Then open the local URL Vite prints, usually:

```text
http://localhost:5173/
```

## Experiments To Try

- Change the minimum and maximum password lengths.
- Add an option for lowercase-only mode.
- Add an option to exclude ambiguous characters.
- Copy only the first four characters using `password.slice(0, 4)`.
- Remove `useCallback` temporarily and compare behavior.
- Add a child component wrapped in `React.memo` to observe callback reference effects.
- Change the copied-feedback duration.
- Inspect the input ref in React DevTools.

## Lessons Learned

- `useState` stores values that affect the rendered UI.
- Updating state schedules a React re-render.
- `useCallback` returns a memoized function reference.
- `useCallback` does not automatically call the function inside it.
- `useCallback` dependencies decide when a new function reference is created.
- `useEffect` runs after React commits a render.
- `useEffect` dependencies decide when an effect runs again.
- Effect cleanup can clear timers and prevent stale work.
- `useRef` can reference a real DOM element.
- Updating `ref.current` does not trigger a render.
- React state setter functions have stable identities.
- `setPassword` and `setIsCopied` do not need to be listed as callback dependencies.
- Random indexes should not add `1` after `Math.floor(Math.random() * length)`.
- JavaScript strings are immutable and do not have `splice()`.
- Selecting input text and choosing clipboard text are separate operations.
- Clipboard writes should be handled with `try...catch`.
- `onClick` is for click actions.
- `onChange` is for form-control changes.

## Future Improvements

- Add password-strength scoring.
- Add an exclude-characters input.
- Add a pronounceable password mode.
- Add `localStorage` preferences.
- Add Web Crypto API generation for stronger randomness.
- Add copy-history entries without storing sensitive values permanently.
