import { Link, useNavigate, useParams } from "react-router";
import { courses } from "../data/courses";

function CourseDetailsPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    return (
      <section className="rounded-lg border border-slate-300 bg-white p-6 shadow-sm">
        <h2 className="text-3xl font-bold text-slate-950">Course not found</h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          No course exists for the route parameter:{" "}
          <code className="font-mono">{courseId}</code>
        </p>
        <Link
          to="/courses"
          className="mt-5 inline-flex rounded-md border border-slate-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Back to courses
        </Link>
      </section>
    );
  }

  function handleAskQuestion() {
    navigate("/contact", {
      state: {
        from: "course-details",
        courseId: course.id,
        message: `I want to ask about ${course.title}.`,
      },
    });
  }

  return (
    <section className="rounded-lg border border-slate-300 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-blue-700">{course.level}</p>
      <h2 className="mt-2 text-3xl font-bold text-slate-950">{course.title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        {course.description}
      </p>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md bg-slate-50 p-4">
          <dt className="text-sm font-semibold text-slate-600">Course ID</dt>
          <dd className="mt-1 font-mono text-sm text-slate-950">{course.id}</dd>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <dt className="text-sm font-semibold text-slate-600">Lessons</dt>
          <dd className="mt-1 text-sm font-semibold text-slate-950">
            {course.lessons}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/courses"
          className="rounded-md border border-slate-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Back to courses
        </Link>

        <button
          type="button"
          onClick={handleAskQuestion}
          className="rounded-md border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Ask about this course
        </button>
      </div>
    </section>
  );
}

export default CourseDetailsPage;
