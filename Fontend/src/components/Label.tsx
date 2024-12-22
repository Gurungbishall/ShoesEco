export default function Label({ Name }: { Name: string }) {
  return (
    <>
      <label className="text-lg font-sans ">{Name}</label>
    </>
  );
}
