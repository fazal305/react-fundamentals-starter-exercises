import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <Container className="py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-950">Add post</h1>
      <PostForm />
    </Container>
  );
}

export default AddPost;
