import MarkdownToJsx from "markdown-to-jsx";
import { createElement } from "react";

const PROHIBITED_TAGS = ["script", "style"];
const Button = ({ children }) => {
  return <button onClick={() => alert(1)}>{children}</button>;
};

export default function Markdown({ children }) {
  return (
    <MarkdownToJsx
      options={{
        createElement: (type, props, children) => {
          if (typeof type !== "string") {
            return createElement(type, props, children);
          }

          if (PROHIBITED_TAGS.indexOf(type) !== -1) {
            return "";
          }

          return createElement(type, props, children);
        },
        overrides: {
          Button: {
            component: Button,
          },
        },
      }}
      children={children}
    />
  );
}
