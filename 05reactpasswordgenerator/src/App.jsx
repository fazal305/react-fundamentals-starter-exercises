import { useCallback, useEffect, useRef, useState } from "react";
import HookExplanation from "./components/HookExplanation";
import PasswordDisplay from "./components/PasswordDisplay";
import PasswordOptions from "./components/PasswordOptions";
import { hookConcepts } from "./data/hookConcepts";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SPECIAL_CHARACTERS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const PASSWORD_SETTINGS = {
  minLength: 6,
  maxLength: 32,
  defaultLength: 12,
  copiedFeedbackDurationMs: 1500,
};

function App() {
  const [length, setLength] = useState(PASSWORD_SETTINGS.defaultLength);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const passwordInputRef = useRef(null);

  const generatePassword = useCallback(() => {
    let generatedPassword = "";
    let characterSource = LETTERS;

    if (numberAllowed) {
      characterSource += NUMBERS;
    }

    if (characterAllowed) {
      characterSource += SPECIAL_CHARACTERS;
    }

    for (let index = 0; index < length; index += 1) {
      const randomIndex = Math.floor(Math.random() * characterSource.length);

      generatedPassword += characterSource[randomIndex];
    }

    setPassword(generatedPassword);
    setIsCopied(false);
  }, [length, numberAllowed, characterAllowed]);

  const copyPasswordToClipboard = useCallback(async () => {
    if (!password) {
      return;
    }

    try {
      passwordInputRef.current?.focus();
      passwordInputRef.current?.select();

      await navigator.clipboard.writeText(password);

      setIsCopied(true);
    } catch (error) {
      console.error("Unable to copy password:", error);
    }
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  useEffect(() => {
    if (!isCopied) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsCopied(false);
    }, PASSWORD_SETTINGS.copiedFeedbackDurationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isCopied]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            React Fundamentals
          </p>
          <h1 className="text-4xl font-bold text-slate-950">
            Password Generator
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-700">
            Learning useState, useCallback, useEffect, and useRef through one
            practical React project.
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-5">
            <PasswordDisplay
              password={password}
              inputRef={passwordInputRef}
              isCopied={isCopied}
              onCopy={copyPasswordToClipboard}
              onRegenerate={generatePassword}
            />

            <PasswordOptions
              length={length}
              minLength={PASSWORD_SETTINGS.minLength}
              maxLength={PASSWORD_SETTINGS.maxLength}
              numberAllowed={numberAllowed}
              characterAllowed={characterAllowed}
              onLengthChange={setLength}
              onNumberAllowedChange={setNumberAllowed}
              onCharacterAllowedChange={setCharacterAllowed}
            />
          </div>

          <aside className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
              Current settings
            </h2>

            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600">Length</dt>
                <dd className="font-semibold text-slate-950">{length}</dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-slate-600">Numbers</dt>
                <dd className="font-semibold text-slate-950">
                  {numberAllowed ? "Enabled" : "Disabled"}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-slate-600">Special characters</dt>
                <dd className="font-semibold text-slate-950">
                  {characterAllowed ? "Enabled" : "Disabled"}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <section className="grid gap-4 md:grid-cols-2">
          {hookConcepts.map((concept) => (
            <HookExplanation
              key={concept.id}
              name={concept.name}
              purpose={concept.purpose}
              projectUsage={concept.projectUsage}
              dependencyExplanation={concept.dependencyExplanation}
            />
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
              Selection vs clipboard payload
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Selecting text inside the input and choosing what is passed to{" "}
              <code className="font-mono">navigator.clipboard.writeText()</code>{" "}
              are separate operations. This project selects the visible password
              and copies the full password string.
            </p>
          </article>

          <article className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
              Random index note
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              <code className="font-mono">
                Math.floor(Math.random() * source.length)
              </code>{" "}
              generates every valid index from{" "}
              <code className="font-mono">0</code> through{" "}
              <code className="font-mono">source.length - 1</code>.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}

export default App;
