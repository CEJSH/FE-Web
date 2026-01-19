import clsx from "clsx";

interface SkeletonProps {
  width?: number;
  height?: number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, className }) => {
  return (
    <div
      className={clsx("animate-pulse bg-grayscale-50", className)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  );
};

export default Skeleton;
