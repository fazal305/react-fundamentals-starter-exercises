import { Link } from "react-router";
import blogService from "../appwrite/config";

function PostCard({ post }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm">
      <Link to={`/post/${post.$id}`} className="block focus:outline-none focus:ring-2 focus:ring-blue-600">
        <img
          src={blogService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="aspect-video w-full object-cover"
        />
        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
            {post.status}
          </p>
          <h2 className="mt-2 line-clamp-2 text-lg font-bold text-slate-950">
            {post.title}
          </h2>
        </div>
      </Link>
    </article>
  );
}

export default PostCard;
