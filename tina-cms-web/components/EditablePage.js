import React from "react";
import { TinaProvider, TinaCMS } from "tinacms";
import { MarkdownFieldPlugin, HtmlFieldPlugin } from "react-tinacms-editor";
import { StrapiMediaStore, StrapiProvider } from "react-tinacms-strapi";

const EditablePage = (Child) => {
  console.log("Rerendering");
  const cms = new TinaCMS({
    enabled: true,
    sidebar: true,
    media: new StrapiMediaStore(process.env.STRAPI_URL),
  });
  cms.plugins.add(MarkdownFieldPlugin);
  cms.plugins.add(HtmlFieldPlugin);

  return (props) => (
    <TinaProvider cms={cms}>
      <StrapiProvider>
        <Child {...props} cms={cms} />
      </StrapiProvider>
    </TinaProvider>
  );
};

export default EditablePage;
