import { fetchGraphql } from "react-tinacms-strapi";

export async function getBlogPosts() {
  const result = await fetchGraphql(
    process.env.STRAPI_URL,
    `
    query {
      blogPosts {
        id
        title
        date
        slug
        author {
          name
          picture { 
            url
          }
        }
        excerpt
        coverImage {
          url
        }
      }
    }
  `
  );
  return result.data.blogPosts;
}

export async function getBlogPost(slug) {
  const query = `
  query {
    blogPosts(where: {slug: "${slug}"}){
      id
      title
      date
      slug
      content
      author {
        name
        picture { 
          url
        }
      }
      coverImage {
        id
        url
      }
    }
  }
`;

  const result = await fetchGraphql(process.env.STRAPI_URL, query);

  return result.data.blogPosts[0];
}

export async function saveBlogPost({ id, title, content, coverImageId }) {
  const saveMutation = `
    mutation UpdateBlogPost(
      $id: ID!
      $title: String
      $content: String
      
    ) {
      updateBlogPost(
        input: {
          where: { id: $id }
          data: { title: $title, content: $content}
        }
      ) {
        blogPost {
          id
        }
      }
    }`;
  return await fetchGraphql(process.env.STRAPI_URL, saveMutation, {
    id,
    title,
    content,
  });
}
