import { Navigate, Route, Routes } from "react-router";
import AppLayout from "./components/AppLayout";
import ProfileLayout from "./components/ProfileLayout";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import CoursesPage from "./pages/CoursesPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfileOverviewPage from "./pages/ProfileOverviewPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />

        <Route path="courses">
          <Route index element={<CoursesPage />} />
          <Route path=":courseId" element={<CourseDetailsPage />} />
        </Route>

        <Route path="profile" element={<ProfileLayout />}>
          <Route index element={<ProfileOverviewPage />} />
          <Route path="settings" element={<ProfileSettingsPage />} />
        </Route>

        <Route path="contact" element={<ContactPage />} />

        <Route
          path="old-courses"
          element={<Navigate to="/courses" replace />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
