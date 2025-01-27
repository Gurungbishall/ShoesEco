export default function SignOutComponent() {
  const deleteInfo = () => {
    sessionStorage.clear;
  };
  return (
    <>
      <div onClick={deleteInfo}>signOut</div>
    </>
  );
}
