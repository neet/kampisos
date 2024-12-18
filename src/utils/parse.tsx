import {
  default as _parse,
  DOMNode,
  domToReact,
  Element,
} from "html-react-parser";
import { createElement, ReactNode } from "react";

import { Alignment } from "./alignment";

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

const colorByScore = (score: number): string => {
  const channel = Math.ceil(score * 4);
  return `var(--teal-${channel})`;
}

const markupByScore = (text: string, scoresByChar: number[]): ReactNode => {
  const fragments: ReactNode[] = [];

  for (let i = 0; i < text.length; i++) {
    const score = scoresByChar[i];

    fragments.push(
      <span
        key={i}
        style={{
          // color: Math.ceil(score*5*12) > 5 ? "var(--teal-11)" : undefined,
          backgroundColor: colorByScore(score * 10)
        }}  
        data-score={score}  
      >
        {text[i]}
      </span>,
    );
  }

  return <span>{fragments}</span>;
};

const mergeArrayByMax = (a: number[], b: number[]): number[] => {
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;

  return longer.map((val, i) => {
    return shorter[i] !== undefined ? Math.max(val, shorter[i]) : val;
  });
};

export type FormatResult = {
  text: ReactNode;
  translation: ReactNode;
};

export function format(
  text: string,
  translation: string,
  alignmentMatrix: Alignment | undefined,
): FormatResult {
  if (
    !alignmentMatrix ||
    (text.includes("<em>") && translation.includes("<em>"))
  ) {
    return {
      text: parse(text),
      translation: parse(translation),
    };
  }

  if (text.includes("<em>")) {
    const spans = findEmSpans(text);

    const correspondenceS = spans.map(([start, end]) =>
      alignmentMatrix.lookupBBySpan(start, end),
    );

    const correspondence = correspondenceS.reduce(mergeArrayByMax, []);

    return {
      text: parse(text),
      translation: markupByScore(translation, correspondence),
    };
  }

  if (translation.includes("<em>")) {
    const spans = findEmSpans(translation);
    const correspondenceS = spans.map(([start, end]) =>
      alignmentMatrix.lookupABySpan(start, end),
    );

    const correspondence = correspondenceS.reduce(mergeArrayByMax, []);

    return {
      text: markupByScore(text, correspondence),
      translation: parse(translation),
    };
  }

  throw new Error("No <em> tags found");
}
