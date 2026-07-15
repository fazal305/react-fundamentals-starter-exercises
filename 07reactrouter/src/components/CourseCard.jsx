import { Link } from "react-router";

function CourseCard({ course }) {
  return (
    <article className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-blue-700">{course.level}</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-950">
            {course.title}
          </h3>
        </div>

        <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700">
          {course.lessons} lessons
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-700">
        {course.description}
      </p>

      <Link
        to={`/courses/${course.id}`}
        className="mt-5 inline-flex rounded-md border border-slate-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        View course
      </Link>
    </article>
  );
}

export default CourseCard;
