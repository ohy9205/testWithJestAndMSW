import { createCategory, getCategory } from "@/apis/tree";
import { create } from "zustand";

type State = {
  tree: Map<any, any>;
  pick: string;
  openStatusCategory: Record<any, any>;
};
type Action = {
  updateTree: (tree: State["tree"]) => void;
  changePick: (pick: State["pick"]) => void;
  updateOpenStatusCategory: (category: State["openStatusCategory"]) => void;
  // 카테고리 생성함
  create: (pick: string, pDepth: string, pText: string, pOrder: string) => any;
  // 카테고리 리스트 불러옴
  get: (id: string) => any;
};

export const useCategoryStore = create<State & Action>((set) => ({
  tree: new Map(),
  pick: "0",
  openStatusCategory: {},
  updateTree: (tree: any) => set({ tree: tree }),
  changePick: (curPick: string) =>
    set({
      pick: curPick,
    }),
  updateOpenStatusCategory: (category: State["openStatusCategory"]) =>
    set({ openStatusCategory: category }),
  create: async (
    pick: string,
    pDepth: string,
    pText: string,
    pOrder: string
  ) => {
    const data = await createCategory(pick, pDepth + 1, pText, pOrder);
    return data;
  },
  get: async (id) => {
    return await getCategory(id); // 카테고리가져옴
  },
}));
