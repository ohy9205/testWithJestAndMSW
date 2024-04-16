type Props = {
  onClick: () => void;
  text: string;
};

const Button = ({ onClick, text }: Props) => {
  return (
    <button onClick={() => onClick()} className="bg-slate-500 p-1 text-white">
      {text}
    </button>
  );
};

export default Button;
