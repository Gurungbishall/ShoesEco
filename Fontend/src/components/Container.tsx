export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="w-screen p-6 flex flex-col gap-3">{children}</div>;
}
