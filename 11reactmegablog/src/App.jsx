import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import authService from "./appwrite/auth";
import { AuthLayout, Footer, Header } from "./components";
import { AddPost, AllPosts, EditPost, Home, Login, Post, Signup } from "./pages";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <AuthLayout authentication={false} loading={loading}>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout authentication={false} loading={loading}>
                <Signup />
              </AuthLayout>
            }
          />
          <Route
            path="/all-posts"
            element={
              <AuthLayout loading={loading}>
                <AllPosts />
              </AuthLayout>
            }
          />
          <Route
            path="/add-post"
            element={
              <AuthLayout loading={loading}>
                <AddPost />
              </AuthLayout>
            }
          />
          <Route
            path="/edit-post/:slug"
            element={
              <AuthLayout loading={loading}>
                <EditPost />
              </AuthLayout>
            }
          />
          <Route path="/post/:slug" element={<Post />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
