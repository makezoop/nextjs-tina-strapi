import Link from "next/link";
import { getBlogPosts } from "../loaders/blog-posts";

export default function Home({ posts }) {
  return (
    <>
      {posts.map((post) => (
        <div key={post.title}>
          <Link href={`/blog-posts/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
          <div>{post.excerpt}</div>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps() {
  const contents = await getBlogPosts();

  return {
    props: {
      posts: contents,
    },
  };
}
