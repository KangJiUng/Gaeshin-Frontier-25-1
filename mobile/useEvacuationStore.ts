import { create } from "zustand";

type EvacuationState = "idle" | "detected" | "completed";

interface EvacuationStore {
  state: EvacuationState;
  setState: (newState: EvacuationState) => void;
}

export const useEvacuationStore = create<EvacuationStore>((set) => ({
  state: "idle",
  setState: (newState) => set({ state: newState }),
}));
