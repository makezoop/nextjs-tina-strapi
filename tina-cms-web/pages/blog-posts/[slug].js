import React, { useEffect } from "react";
import { useCMS, useForm, usePlugin } from "tinacms";
import Markdown from "../../components/Markdown";
import { saveBlogPost } from "../../loaders/blog-posts";
import EditablePage from "../../components/EditablePage";

function Post({ post }) {
  const cms = useCMS();

  const [editableData, form] = useForm({
    id: "home",
    label: "Edit Page",
    fields: [
      { name: "title", component: "text" },
      { name: "content", component: "markdown" },
      {
        component: "image",
        name: "coverImage.id",
        parse: (media) => {
          console.log(media);
          console.log("when", media.id);
          return media.id;
        },
        uploadDir: () => `/`,
      },
    ],
    initialValues: post,
    onSubmit: async (values) => {
      // console.log(values);
      // console.log("fileId", cms.media.store.getFileId(values.coverImageId.id));
      const response = await saveBlogPost({
        id: values.id,
        title: values.title,
        content: values.content,
        coverImageId: values.coverImage.id,
      });
      console.log(JSON.stringify(response));
      if (response.data) {
        cms.alerts.success("Changes Saved");
      } else {
        cms.alerts.error("Error saving changes");
      }
    },
  });

  usePlugin(form);

  return (
    <>
      <img src={process.env.STRAPI_URL + editableData.coverImage.url} />
      <div>{editableData.title}</div>

      <Markdown>{editableData.content}</Markdown>
    </>
  );
}

export default EditablePage(Post);

import { getBlogPost, getBlogPosts } from "../../loaders/blog-posts";

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const blog = await getBlogPost(slug);
  console.log("fetching new props for", JSON.stringify(params));
  return {
    props: {
      post: blog,
    },
  };
}

export async function getStaticPaths() {
  const blogs = await getBlogPosts();

  const paths = blogs.map((post) => {
    return {
      params: {
        slug: `${post.slug}`,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}
