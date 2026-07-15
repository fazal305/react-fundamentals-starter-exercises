import { useState } from "react";
import CourseCard from "../components/CourseCard";
import { courses } from "../data/courses";

function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredCourses = courses.filter((course) => {
    const searchableText = `${course.title} ${course.level}`.toLowerCase();

    return searchableText.includes(normalizedSearchTerm);
  });

  return (
    <section className="space-y-5">
      <div className="rounded-lg border border-slate-300 bg-white p-6 shadow-sm">
        <h2 className="text-3xl font-bold text-slate-950">Courses</h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Course cards are generated from data, use stable course IDs as keys,
          and link to dynamic detail routes.
        </p>

        <label
          htmlFor="course-search"
          className="mt-5 block text-sm font-semibold text-slate-700"
        >
          Search by title or level
        </label>
        <input
          id="course-search"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-slate-300 bg-white p-6 text-sm text-slate-700 shadow-sm">
          No courses match your search.
        </div>
      )}
    </section>
  );
}

export default CoursesPage;
