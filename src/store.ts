import {create} from "zustand";
interface SelectedPeopleStore {
    selectedPeople: string[];
    addSelectedPerson: (personName: string) => void;
    removeSelectedPerson: (personName: string) => void;
    clearSelectedPeople: () => void;
}

export const useSelectedPeopleStore = create<SelectedPeopleStore>((set) => ({
    selectedPeople: [],
    addSelectedPerson: (personName) => set((state) => ({
        selectedPeople: [...state.selectedPeople, personName]
    })),
    removeSelectedPerson: (personName) => set((state) => ({
        selectedPeople: state.selectedPeople.filter((name) => name !== personName)
    })),
    clearSelectedPeople: () => set({ selectedPeople: [] })
}));