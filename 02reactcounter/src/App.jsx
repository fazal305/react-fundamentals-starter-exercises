import Counter from "./components/Counter";

function App() {
  return (
    <>
      <h1>React Counter Hooks Practice</h1>

      <Counter label="Small Counter" min={0} max={20} />
      <Counter label="Larger Counter" min={0} max={30} />
    </>
  );
}

export default App;
