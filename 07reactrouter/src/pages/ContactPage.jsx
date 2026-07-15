import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

function ContactPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationMessage = location.state?.message ?? "";

  const [name, setName] = useState("");
  const [message, setMessage] = useState(navigationMessage);

  function handleSubmit(event) {
    event.preventDefault();

    navigate("/", {
      replace: true,
      state: {
        notice: "Your demo message was submitted.",
      },
    });
  }

  return (
    <section className="rounded-lg border border-slate-300 bg-white p-6 shadow-sm">
      <h2 className="text-3xl font-bold text-slate-950">Contact</h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        This page can receive temporary navigation state from another route, but
        it also works safely when opened directly.
      </p>

      {location.state && (
        <div className="mt-4 rounded-md border border-blue-300 bg-blue-50 p-4 text-sm text-blue-800">
          Navigation state received from:{" "}
          <strong>{location.state.from ?? "unknown route"}</strong>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-semibold text-slate-700"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm font-semibold text-slate-700"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={5}
            className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button
          type="submit"
          className="rounded-md border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Submit demo message
        </button>
      </form>
    </section>
  );
}

export default ContactPage;
