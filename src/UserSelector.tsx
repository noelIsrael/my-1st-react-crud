import { useSelectedPeopleStore } from "./store";

function UserSelector({ userName }: { userName: string }) {
    const addSelectedPerson = useSelectedPeopleStore((state) => state.addSelectedPerson);
    const removeSelectedPerson = useSelectedPeopleStore((state) => state.removeSelectedPerson);

  const isSelected = useSelectedPeopleStore((state) => state.selectedPeople.includes(userName));

  function handleClick(userName: string) {
    if (isSelected) {
      removeSelectedPerson(userName);
    }else if (!isSelected) {
      addSelectedPerson(userName);
    }
  }
  return <button onClick={() => handleClick(userName)}> {isSelected ? 'Remove' : 'Add'} {userName} </button>;
}

export default UserSelector;
