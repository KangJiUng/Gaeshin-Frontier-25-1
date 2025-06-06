import { create } from "zustand";

type EvacuationState = "idle" | "detected";

interface EvacuationStore {
  state: EvacuationState;
  setState: (newState: EvacuationState) => void;

  secondsElapsed: number;
  startTimer: () => void;
  resetTimer: () => void;
  stopTimer: () => void;

  dotTop: number;
  dotLeft: number;
  setDotPosition: (top: number, left: number) => void;

  animationStep: number;
  setAnimationStep: (step: number) => void;
}

let timerId: ReturnType<typeof setInterval> | null = null;

export const useEvacuationStore = create<EvacuationStore>((set, get) => ({
  state: "idle",

  setState: (newState) => {
    set({ state: newState });

    if (newState === "idle") {
      get().resetTimer();
    }
  },

  secondsElapsed: 0,

  startTimer: () => {
    if (timerId) return;
    timerId = setInterval(() => {
      set((state) => ({ secondsElapsed: state.secondsElapsed + 1 }));
    }, 1000);
  },

  stopTimer: () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  },

  resetTimer: () => {
    get().stopTimer();
    set({ secondsElapsed: 0 });
  },

  dotTop: 245,
  dotLeft: 138,
  setDotPosition: (top, left) => {
    set({ dotTop: top, dotLeft: left });
  },

  animationStep: 0,
  setAnimationStep: (step) => {
    set({ animationStep: step });
  },
}));
