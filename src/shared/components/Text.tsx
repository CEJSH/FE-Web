const Text = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <span className={className}>{children}</span>;
};

export default Text;
