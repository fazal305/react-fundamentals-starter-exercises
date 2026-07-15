# 04reactbgchanger — BG Changer

A React Fundamentals exercise exploring useState initial values, correct onClick argument-passing, reusable data-driven components, the real DOM background-color property, and useEffect for synchronizing state with something outside React's own render tree.

## Learning Goals

- Understand how a `useState` initial value defines the starting UI state.
- Understand why a full page reload resets React state to the initial value.
- Learn why `onClick` needs a function reference, not a function call.
- Learn how to pass arguments to event handlers with an arrow function.
- Build one reusable props-driven component instead of duplicating JSX.
- Generate components from a data array with `.map()`.
- Use the correct DOM style property: `backgroundColor`, not `bgColor`.
- Use `useEffect` to synchronize React state with something outside React's own tree.
- Display the currently active state value back to the user.

## Concepts Covered

### useState Initial Values and Why Reload Resets Them

The initial value passed to `useState` defines the starting state for that component.

In this project, the app starts with:

```javascript
const [color, setColor] = useState(colors[0].value);
```

The first color in `src/data/colors.js` is `olive`, so the starting background color is olive.

If you click another color, React updates state in memory while the page's JavaScript is running. A full page reload discards that JavaScript runtime and starts the app fresh. `useState(colors[0].value)` runs again from scratch, so the color returns to the initial value.

This is not React secretly persisting or resetting anything. The previous running app instance is gone after the reload.

### Passing Arguments to Event Handlers Correctly

`onClick` needs a function reference.

This is wrong:

```jsx
<button onClick={changeColor(color)}>{color}</button>
```

That calls `changeColor(color)` immediately during render, not when the button is clicked. Then `onClick` receives whatever that function returned, usually `undefined`.

This is also wrong for this use case:

```jsx
<button onClick={changeColor}>{color}</button>
```

That passes a function reference, but it does not pass the specific color argument your handler needs.

This is correct:

```jsx
<button onClick={() => changeColor(color)}>{color}</button>
```

The arrow function is the function reference React stores. When the click happens, React calls that arrow function, and then the arrow function calls `changeColor(color)` with the right value.

### The bgColor Typo

There is no real DOM style property called `bgColor`.

This silently fails:

```javascript
document.body.style.bgColor = "red";
```

It does not throw an error, which makes it sneaky. It creates an unused custom property on the style object, but it does not change the visible background.

The correct property is:

```javascript
document.body.style.backgroundColor = "red";
```

CSS uses kebab-case:

```css
background-color
```

JavaScript style properties use camelCase:

```javascript
backgroundColor;
```

### Reusable, Data-Driven Components

Instead of writing one button per color by hand, this project stores colors in `src/data/colors.js` and generates buttons with `.map()`.

```jsx
{
  colors.map((item) => (
    <ColorButton
      key={item.id}
      label={item.label}
      value={item.value}
      onSelect={handleSelectColor}
    />
  ));
}
```

This is better because adding a new color only requires adding a new object to the data array. The component rendering code does not need to be duplicated or edited per color.

### useEffect for External Synchronization

React manages the UI inside the root container it renders into. `document.body` is outside that React tree.

For this project, the selected color is React state:

```javascript
const [color, setColor] = useState(colors[0].value);
```

The body background is synchronized with that state using `useEffect`:

```javascript
useEffect(() => {
  document.body.style.backgroundColor = color;
}, [color]);
```

Directly setting `document.body.style.backgroundColor` inside the click handler would work in a tiny toy app. But `useEffect` is preferred here because it keeps the external synchronization rule in one place: whenever `color` changes, update the body background.

That way, if another event or feature changes `color` later, the background still stays in sync.

## Project Structure

```text
04reactbgchanger/
  src/
    components/
      ColorButton.jsx
      ColorReadout.jsx
    data/
      colors.js
    App.jsx
    main.jsx
    index.css
  index.html
  package.json
  vite.config.js
  README.md
```

## Components

### ColorButton

A reusable button component.

It receives:

- `label`
- `value`
- `onSelect`

It renders a real button and uses:

```jsx
onClick={() => onSelect(value)}
```

to pass the color value correctly when clicked.

### ColorReadout

Displays the currently selected color label.

It also explains that reloading the page returns the color to the initial value because React state is memory-only unless you explicitly persist it somewhere.

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

- Add an 8th color to the data array and confirm no other code needs to change.
- Temporarily reintroduce the `bgColor` typo and observe that nothing errors, just nothing happens.
- Move the `document.body.style.backgroundColor` line back inside the click handler instead of `useEffect`, and discuss why `useEffect` is still preferable even though both work.
- Reload the page after selecting a different color and confirm it returns to the initial color.

## Lessons Learned

- `useState`'s initial value defines the starting UI state.
- React state lives in memory only while the current page's JavaScript runtime exists.
- A full reload starts the app from scratch, so state returns to the initial value.
- `onClick={changeColor(color)}` calls the function immediately during render.
- `onClick={changeColor}` passes a function reference, but cannot provide a custom argument by itself.
- `onClick={() => changeColor(color)}` passes a function React can call later and still provides the right argument.
- `document.body.style.bgColor` is not a real DOM style property and silently fails.
- `document.body.style.backgroundColor` is the correct JavaScript DOM style property.
- Data arrays plus `.map()` help avoid duplicated JSX.
- `useEffect` is the idiomatic way to synchronize React state with something outside React's render tree.

## Future Improvements

- Add a manual hex color picker alongside the preset buttons.
- Persist the last selected color to `localStorage` so it survives reload, contrasting directly with the reload-resets-state lesson from this project.
- Animate the background color transition.
