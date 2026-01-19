export default function splitMention(content: string): {
  mention: string | null;
  text: string;
} {
  const match = content.match(/^@[^ ]+/);
  const mention = match ? match[0] : null;
  const text = mention ? content.slice(mention.length).trimStart() : content;
  return { mention, text };
}
