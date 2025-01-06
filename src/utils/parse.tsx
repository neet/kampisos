import {
  default as _parse,
  DOMNode,
  domToReact,
  Element,
} from "html-react-parser";
import { ReactNode } from "react";

import { CharAlignment } from "../models/alignment";
import { maximum } from "./array";

const isElement = (node: DOMNode): node is Element => "name" in node;

export function parse(html: string) {
  return _parse(html, {
    replace: (domNode) => {
      if (isElement(domNode) && domNode.name === "em") {
        return <em>{domToReact(domNode.children as DOMNode[])}</em>;
      }
    },
  });
}

// f("hello <em>world</em>.") -> [[6, 11]]
const findEmSpans = (textStr: string): number[][] => {
  const em = "<em>";
  const emEnd = "</em>";
  const spans: number[][] = [];

  let plainTextCount = 0;
  let htmlCount = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const start = textStr.indexOf(em, htmlCount);
    if (start === -1) {
      break;
    }

    const end = textStr.indexOf(emEnd, start);
    if (end === -1) {
      break;
    }

    const plainStart = start - htmlCount;
    const plainEnd = end - htmlCount - em.length;

    spans.push([plainTextCount + plainStart, plainTextCount + plainEnd]);

    plainTextCount += plainEnd + emEnd.length;
    htmlCount += end + emEnd.length;
  }

  return spans;
};

const createStyleFromScore = (score: number): React.CSSProperties => {
  const styles: React.CSSProperties = {};

  if (score > 0.09) {
    styles.backgroundColor = `var(--amber-4)`;
  } else if (score > 0.08) {
    styles.backgroundColor = `var(--amber-3)`;
  } else if (score > 0.07) {
    styles.backgroundColor = `var(--amber-2)`;
  }

  return styles;
};

const markupByScore = (text: string, scoresByChar: number[]): ReactNode => {
  const fragments: ReactNode[] = [];

  for (let i = 0; i < text.length; i++) {
    const score = scoresByChar[i];

    if (score == 0) {
      fragments.push(text[i]);
    } else {
      fragments.push(
        <span key={i} style={createStyleFromScore(score)} data-score={score}>
          {text[i]}
        </span>,
      );
    }
  }

  return <span>{fragments}</span>;
};

export type FormatResult = {
  text: ReactNode;
  translation: ReactNode;
};

export function format(
  text: string,
  translation: string,
  alignment?: CharAlignment,
): FormatResult {
  if (!alignment || (text.includes("<em>") && translation.includes("<em>"))) {
    return {
      text: parse(text),
      translation: parse(translation),
    };
  }

  if (text.includes("<em>")) {
    const spans = findEmSpans(text);
    const scores = spans
      .map(([start, end]) => alignment.getJapaneseScoresAinuSpan(start, end))
      .reduce(maximum, []);

    return {
      text: parse(text),
      translation: markupByScore(translation, scores),
    };
  }

  if (translation.includes("<em>")) {
    const spans = findEmSpans(translation);
    const scores = spans
      .map(([start, end]) =>
        alignment.getAinuScoresFromJapaneseSpan(start, end),
      )
      .reduce(maximum, []);

    return {
      text: markupByScore(text, scores),
      translation: parse(translation),
    };
  }

  throw new Error("No <em> tags found");
}
