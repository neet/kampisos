import {
  default as _parse,
  DOMNode,
  domToReact,
  Element,
} from "html-react-parser";

const isElement = (node: DOMNode): node is Element => "name" in node;

export function parse(html: string) {
  return _parse(html, {
    replace: (domNode) => {
      if (isElement(domNode) && domNode.name === "em") {
        return (
          <em className="not-italic bg-yellow-200 dark:bg-yellow-800">
            {domToReact(domNode.children as DOMNode[])}
          </em>
        );
      }
    },
  });
}
