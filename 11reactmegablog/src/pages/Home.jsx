import { useEffect, useState } from "react";
import blogService from "../appwrite/config";
import { Container, Loading, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    blogService
      .getPosts()
      .then((response) => setPosts(response.rows || []))
      .catch((error) =>
        setError(error.message || "Could not load posts from Appwrite.")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading message="Loading posts..." />;
  }

  return (
    <Container className="py-10">
      <section className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          React Fundamentals Mega Project
        </p>
        <h1 className="mt-3 text-4xl font-bold text-slate-950">MegaBlog</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
          A production-shaped blog app with Appwrite auth, protected routes,
          image uploads, rich text content, and Redux Toolkit auth state.
        </p>
      </section>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
          <h2 className="text-xl font-bold text-slate-950">No active posts yet</h2>
          <p className="mt-2 text-sm text-slate-600">
            Once posts are published as active, they will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.$id} post={post} />
          ))}
        </div>
      )}
    </Container>
  );
}

export default Home;
