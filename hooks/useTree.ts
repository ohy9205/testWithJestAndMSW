import { useCategoryStore } from "@/store/category";
import { useEffect, useState } from "react";

// Tree관련 훅
const useTree = () => {
  const {
    tree,
    pick,
    openStatusCategory,
    get,
    create,
    updateOpenStatusCategory,
    updateTree,
    changePick,
  } = useCategoryStore((state) => state);
  const [isShowNewFolderInput, setIsShowNewFolderInput] = useState(false);

  useEffect(() => {
    const initFetch = async () => {
      const data = await get(pick);
      updateTree(new Map(tree).set(pick, data));
      updateOpenStatusCategory(toggleOpen(pick, openStatusCategory));
    };

    initFetch();
  }, []);

  return {
    data: {
      tree,
      pick,
      openStatusCategory,
      isShowNewFolderInput,
    },
    // 카테고리 생성함
    create: async (
      pick: string,
      pDepth: string,
      pText: string,
      pOrder: string
    ) => {
      // 카테고리를 생성하고 리스트를 새로불러옴
      const newCategoryResponse = await create(pick, pDepth + 1, pText, pOrder);
      const data = await get(pick);
      updateTree(new Map(tree).set(pick, data));
      changePick(newCategoryResponse.id); // pick바꾸고
    },
    getList: async (id: string) => {
      // 카테고리 리스트 불러옴
      pick !== id && changePick(id);
      if (!tree.has(id)) {
        // tree에 데이터 없을때만 새로 api호출
        const data = await get(id);
        updateTree(new Map(tree).set(id, data));
      }
      updateOpenStatusCategory(toggleOpen(id, openStatusCategory));
    },
    onCreateButtonHandler: async (id: string) => {
      changePick(id);
      setIsShowNewFolderInput(true);
    },
  };
};

export default useTree;

// 카테고리 open/close
const toggleOpen = (id: string, status: any) => {
  return { ...status, [id]: !status[id] };
};
