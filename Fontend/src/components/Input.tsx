export default function Input({
  type,
  value,
  onChange,
}: {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-2 border-2 text-xl"
      />
    </>
  );
}
