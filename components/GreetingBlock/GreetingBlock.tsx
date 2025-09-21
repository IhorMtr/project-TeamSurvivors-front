interface GreetingBlockProps {
  title: string;
}
const GreetingBlock = ({ title }: GreetingBlockProps) => {
  return <h1>Доброго ранку, {title}!</h1>;
};

export default GreetingBlock;
