import { create } from "zustand";

type Category = {
  id: string;
  text: string;
  parent: string;
  data: { depth: number };
}[];

type State = {
  tree: Map<string, Category>;
  pick: string;
  updateTree: (tree: State["tree"]) => void;
  updatePick: (pick: State["pick"]) => void;
};

export const useCategoryStore = create<State>((set) => ({
  tree: new Map(),
  updateTree: (tree: any) => set({ tree: tree }),
  pick: "0",
  updatePick: (curPick: string) =>
    set({
      pick: curPick,
    }),
}));
