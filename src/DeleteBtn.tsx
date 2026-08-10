function DeleteBtn({
  abilityToRefresh,
  id,
}: {
  abilityToRefresh: React.Dispatch<React.SetStateAction<number>>;
  id: string;
}) {
  return (
    <button onClick={() => {
      fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE'
      })
      abilityToRefresh(prev => prev + 1)
    }}>
      Delete
    </button>
  )
}
export default DeleteBtn