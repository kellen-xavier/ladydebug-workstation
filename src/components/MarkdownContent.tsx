import type { Blockquote, Heading, Root } from "mdast";
import Markdown, { type Components } from "react-markdown";
import { ExternalLink } from "./ExternalLink";

type Part = "title" | "body";

function selectPart({ part }: { part?: Part }) {
  return (tree: Root) => {
    if (!part) return;
    const title = tree.children.findIndex((node) => node.type === "heading");
    tree.children = tree.children.filter((_, index) =>
      part === "title" ? index === title : index !== title,
    );
  };
}

// A level-two heading starts a collapsible reference section in work reports.
function referenceDisclosures() {
  return (tree: Root) => {
    const children: Root["children"] = [];
    let disclosure: Blockquote | undefined;
    for (const node of tree.children) {
      if (node.type === "heading" && node.depth === 2) {
        const summary: Heading = { ...node, data: { hName: "summary" } };
        disclosure = {
          type: "blockquote",
          data: { hName: "details", hProperties: { className: ["provenance"] } },
          children: [summary],
        };
        children.push(disclosure);
      } else if (disclosure) {
        disclosure.children.push(node as Blockquote["children"][number]);
      } else {
        children.push(node);
      }
    }
    tree.children = children;
  };
}

const linkComponents: Components = {
  a: ({ children, href }) =>
    href?.startsWith("https://") || href?.startsWith("http://") ? (
      <ExternalLink href={href}>{children}</ExternalLink>
    ) : (
      <a href={href}>{children}</a>
    ),
};

export function MarkdownContent({
  children,
  part,
  components,
  disclosures = false,
}: {
  children: string;
  part?: Part;
  components?: Components;
  disclosures?: boolean;
}) {
  return (
    <Markdown
      skipHtml
      remarkPlugins={
        disclosures ? [[selectPart, { part }], referenceDisclosures] : [[selectPart, { part }]]
      }
      components={{ ...linkComponents, ...components }}
    >
      {children}
    </Markdown>
  );
}
