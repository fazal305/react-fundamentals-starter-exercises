import { useEffect, useState } from "react";
import { useParams } from "react-router";
import blogService from "../appwrite/config";
import { Container, Loading, PostForm } from "../components";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      blogService
        .getPost(slug)
        .then((post) => setPost(post))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return <Loading message="Loading post editor..." />;
  }

  return (
    <Container className="py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-950">Edit post</h1>
      {post ? (
        <PostForm post={post} />
      ) : (
        <p className="rounded-md border border-slate-300 bg-white p-5 text-slate-700">
          Post not found.
        </p>
      )}
    </Container>
  );
}

export default EditPost;
