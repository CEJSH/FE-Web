import dynamic from "next/dynamic";

const FeedPage = dynamic(() => import("@/features/feed/components/FeedPage/FeedPage"), {
  ssr: false,
});

export default function Page() {
  return <FeedPage />;
}
