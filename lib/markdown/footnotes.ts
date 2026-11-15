import type { Element, ElementContent, Root, Text } from "hast";

/**
 * Rehype plugin that wraps each footnote reference together with the word it
 * annotates in <span class="article-footnote-ref">, so the pair can be
 * highlighted when the reader jumps back from the footnote.
 *
 * The word is the one touching the marker: the next word for `[^1]word`, else
 * the previous word for `word[^1]`. With whitespace on both sides, only the
 * marker is wrapped.
 */
export function rehypeFootnoteWords() {
  return (tree: Root) => {
    wrapIn(tree);
  };
}

const isFootnoteRef = (node: ElementContent): node is Element =>
  node.type === "element" &&
  node.tagName === "sup" &&
  node.children.some(
    (child) => child.type === "element" && child.properties?.dataFootnoteRef !== undefined,
  );

const text = (value: string): Text => ({ type: "text", value });

function wrapIn(parent: Root | Element) {
  const children = parent.children as ElementContent[];

  for (let i = 0; i < children.length; i++) {
    const node = children[i];

    if (node.type !== "element") continue;
    if (!isFootnoteRef(node)) {
      wrapIn(node);
      continue;
    }

    const prev = children[i - 1];
    const next = children[i + 1];
    const wrapped: ElementContent[] = [node];
    const before: ElementContent[] = [];
    const after: ElementContent[] = [];
    // The range of children the span replaces.
    let from = i;
    let to = i;

    const nextWord = next?.type === "text" ? next.value.match(/^\S+/)?.[0] : undefined;
    const prevWord = prev?.type === "text" ? prev.value.match(/\S+$/)?.[0] : undefined;

    if (nextWord && next.type === "text") {
      wrapped.push(text(nextWord));
      const rest = next.value.slice(nextWord.length);
      if (rest) after.push(text(rest));
      to = i + 1;
    } else if (prevWord && prev.type === "text") {
      wrapped.unshift(text(prevWord));
      const rest = prev.value.slice(0, -prevWord.length);
      if (rest) before.push(text(rest));
      from = i - 1;
    }

    const span: Element = {
      type: "element",
      tagName: "span",
      properties: { className: ["article-footnote-ref"] },
      children: wrapped,
    };
    children.splice(from, to - from + 1, ...before, span, ...after);
    i = from + before.length; // the span; the loop moves past it
  }
}
