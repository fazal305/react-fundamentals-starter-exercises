import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import blogService from "../appwrite/config";
import { Button, Container, Loading } from "../components";

function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      blogService
        .getPost(slug)
        .then((post) => setPost(post))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  async function deletePost() {
    if (!post) {
      return;
    }

    const deleted = await blogService.deletePost(post.$id);

    if (deleted) {
      await blogService.deleteFile(post.featuredImage);
      navigate("/");
    }
  }

  if (loading) {
    return <Loading message="Loading post..." />;
  }

  if (!post) {
    return (
      <Container className="py-10">
        <p className="rounded-md border border-slate-300 bg-white p-5 text-slate-700">
          Post not found.
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <article className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm">
        <img
          src={blogService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="max-h-[520px] w-full object-cover"
        />

        <div className="p-6">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                {post.status}
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-950">
                {post.title}
              </h1>
            </div>

            {isAuthor ? (
              <div className="flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button variant="secondary">Edit</Button>
                </Link>
                <Button variant="danger" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            ) : null}
          </div>

          <div className="blog-content mt-6 text-slate-700">
            {parse(post.content)}
          </div>
        </div>
      </article>
    </Container>
  );
}

export default Post;
