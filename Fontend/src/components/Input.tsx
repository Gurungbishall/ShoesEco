export default function Input({
  type,
  placeholder,
}: {
  type: string;
  placeholder: string;
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full pl-6 py-2 text-lg bg-gray-100 focus:outline-black focus:ring-2 focus:ring-black rounded-xl"
      />
    </>
  );
}
