{
  /** 트리거 의도를 분명히 하기 위해 분리 */
}
export default function LoadMoreTrigger({
  loadMoreRef,
}: {
  loadMoreRef: (node?: Element | null) => void;
}) {
  return <div ref={loadMoreRef} />;
}
