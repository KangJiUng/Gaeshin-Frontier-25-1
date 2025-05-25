import { create } from "zustand";

type EvacuationState = "idle" | "detected" | "completed";

interface EvacuationStore {
  state: EvacuationState;
  setState: (newState: EvacuationState) => void;

  secondsElapsed: number;
  startTimer: () => void;
  resetTimer: () => void;
  stopTimer: () => void;
}

let timerId: ReturnType<typeof setInterval> | null = null;

export const useEvacuationStore = create<EvacuationStore>((set, get) => ({
  state: "idle",

  setState: (newState) => {
    set({ state: newState });

    // 상태가 completed일 경우 타이머 초기화
    if (newState === "completed") {
      get().resetTimer();
    }
  },

  secondsElapsed: 0,

  startTimer: () => {
    if (timerId) return; // 이미 실행 중이면 무시
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
}));
