import { useState } from "react";

function ProfileSettingsPage() {
  const [displayName, setDisplayName] = useState("Fazal");
  const [learningGoal, setLearningGoal] = useState("routing");
  const [savedMessage, setSavedMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setSavedMessage("Settings saved for this demo session.");
  }

  return (
    <section>
      <h3 className="text-2xl font-semibold text-slate-950">
        Profile settings
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        This nested child route owns local state. Navigating between child
        routes can preserve the parent ProfileLayout while child components
        mount and unmount.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="display-name"
            className="block text-sm font-semibold text-slate-700"
          >
            Display name
          </label>
          <input
            id="display-name"
            type="text"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label
            htmlFor="learning-goal"
            className="block text-sm font-semibold text-slate-700"
          >
            Learning goal
          </label>
          <select
            id="learning-goal"
            value={learningGoal}
            onChange={(event) => setLearningGoal(event.target.value)}
            className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="routing">Understand routing deeply</option>
            <option value="hooks">Practice hooks</option>
            <option value="projects">Build larger projects</option>
          </select>
        </div>

        <button
          type="submit"
          className="rounded-md border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Save settings
        </button>
      </form>

      {savedMessage && (
        <p className="mt-4 rounded-md border border-green-300 bg-green-50 p-3 text-sm text-green-800">
          {savedMessage}
        </p>
      )}
    </section>
  );
}

export default ProfileSettingsPage;
