import { useEffect, useState } from "react";
import blogService from "../appwrite/config";
import { Container, Loading, PostCard } from "../components";

function AllPosts() {
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
    return <Loading message="Loading all posts..." />;
  }

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold text-slate-950">All active posts</h1>
      <p className="mt-2 text-sm text-slate-600">
        Loaded with a real Appwrite query for posts where status equals active.
      </p>

      {error ? (
        <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.$id} post={post} />
        ))}
      </div>
    </Container>
  );
}

export default AllPosts;
