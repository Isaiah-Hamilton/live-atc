type Props = {
  children: React.ReactNode;
};

const Section = (props: Props) => {
  const { children } = props;

  return <div className="relative mx-auto py-10">{children}</div>;
};

export default Section;
