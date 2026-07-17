import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import blogService from "../../appwrite/config";
import Button from "../Button";
import Input from "../Input";
import RTE from "../RTE";
import Select from "../Select";

function slugTransform(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function PostForm({ post }) {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const defaultValues = useMemo(
    () => ({
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    }),
    [post]
  );

  const { register, handleSubmit, watch, setValue, control, formState } =
    useForm({ defaultValues });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title" && !post) {
        setValue("slug", slugTransform(value.title || ""), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [post, setValue, watch]);

  async function submit(data) {
    setError("");
    setIsSubmitting(true);

    try {
      const file = data.image?.[0]
        ? await blogService.uploadFile(data.image[0])
        : null;

      if (post) {
        if (file && post.featuredImage) {
          await blogService.deleteFile(post.featuredImage);
        }

        const updatedPost = await blogService.updatePost(post.$id, {
          title: data.title,
          content: data.content,
          featuredImage: file ? file.$id : post.featuredImage,
          status: data.status,
        });

        navigate(`/post/${updatedPost.$id}`);
        return;
      }

      if (!file) {
        setError("Featured image is required for a new post.");
        return;
      }

      const createdPost = await blogService.createPost({
        slug: data.slug,
        title: data.title,
        content: data.content,
        featuredImage: file.$id,
        status: data.status,
        userId: userData.$id,
      });

      navigate(`/post/${createdPost.$id}`);
    } catch (error) {
      setError(error.message || "Could not save the post.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        {error ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <Input
          label="Title"
          placeholder="Write a clear post title"
          {...register("title", { required: "Title is required" })}
        />
        {formState.errors.title ? (
          <p className="text-sm text-red-700">{formState.errors.title.message}</p>
        ) : null}

        <Input
          label="Slug"
          placeholder="auto-generated-from-title"
          disabled={Boolean(post)}
          {...register("slug", { required: "Slug is required" })}
        />
        {formState.errors.slug ? (
          <p className="text-sm text-red-700">{formState.errors.slug.message}</p>
        ) : null}

        <RTE
          name="content"
          label="Content"
          control={control}
          defaultValue={defaultValues.content}
        />
        {formState.errors.content ? (
          <p className="text-sm text-red-700">
            {formState.errors.content.message}
          </p>
        ) : null}
      </div>

      <aside className="space-y-5 rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
        <Input
          label={post ? "Replace featured image" : "Featured image"}
          type="file"
          accept="image/png, image/jpeg, image/webp, image/gif"
          {...register("image")}
        />

        {post?.featuredImage ? (
          <img
            src={blogService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="aspect-video w-full rounded-md border border-slate-200 object-cover"
          />
        ) : null}

        <Select
          label="Status"
          options={[
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
          {...register("status", { required: true })}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : post ? "Update post" : "Create post"}
        </Button>
      </aside>
    </form>
  );
}

export default PostForm;
