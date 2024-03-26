type Props = {
  text: string;
  onClick?: () => void;
};

export default function Button({ text, onClick }: Props) {
  return (
    <button
      className='w-full h-full border border-black rounded-3xl text-sm'
      onClick={onClick}
    >
      {text}
    </button>
  );
}
