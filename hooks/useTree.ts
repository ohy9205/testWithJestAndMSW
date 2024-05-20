import { createCategory, getCategory } from "@/apis/tree";
import { useCategoryStore } from "@/store/category";
import { useEffect, useState } from "react";

// Tree관련 훅
const useTree = () => {
  const { tree, pick, updatePick, updateTree } = useCategoryStore(
    (state) => state
  );
  const [isShowNewFolderInput, setIsShowNewFolderInput] = useState(false);
  const [openStatusCategory, setOpenStatusCategory] = useState<
    Record<any, any>
  >({});

  const readAndUpdateCategory = async (id: string) => {
    if (!tree.has(id)) {
      const data = await getCategory(id);
      if (data.code === "OK") {
        updateTree(new Map(tree).set(id, data.value || []));
      }
    }
  };

  useEffect(() => {
    readAndUpdateCategory(pick);
  }, []);

  return {
    data: {
      tree,
      pick,
      openStatusCategory,
      isShowNewFolderInput,
    },
    create: async (
      pick: string,
      pDepth: string,
      pText: string,
      pOrder: string
    ) => {
      const newCategoryResponse = await createCategory(
        pick,
        pDepth + 1,
        pText,
        pOrder
      );
      if (newCategoryResponse.code === "OK") {
        updatePick(newCategoryResponse.value.id);
        await readAndUpdateCategory(pick);
      }
    },
    get: async (id: string) => {
      // tree에 데이터 없을때만 새로 api호출
      pick !== id && updatePick(id);
      await readAndUpdateCategory(id);
      setOpenStatusCategory(toggleOpen(id, openStatusCategory));
    },
    showNewFolderInput: (id: string) => {
      updatePick(id);
      setIsShowNewFolderInput(true);
    },
  };
};

export default useTree;

// 카테고리 open/close
const toggleOpen = (id: string, status: any) => {
  return { ...status, [id]: !status[id] };
};
