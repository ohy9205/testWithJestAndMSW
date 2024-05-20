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

  useEffect(() => {
    const initFetch = async () => {
      const data = await getCategory(pick);
      if (data.code === "OK") {
        updateTree(new Map(tree).set(pick, data.value || []));
      }
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
      const newCategoryResponse = await createCategory(
        pick,
        pDepth + 1,
        pText,
        pOrder
      );

      // 생성되면 tree업데이트, pick업데이트
      if (newCategoryResponse.code === "OK") {
        const newTree = {
          ...tree,
          pick: {
            id: newCategoryResponse.value.id,
            text: pText,
            data: { depth: pDepth + 1 },
            parent: pick,
          },
        };
        updateTree(newTree);
        updatePick(newCategoryResponse.value.id); // pick변경
      }
    },
    // 카테고리 리스트 불러옴
    getList: async (id: string) => {
      pick !== id && updatePick(id);
      // tree에 데이터 없을때만 새로 api호출
      if (!tree.has(id)) {
        const data = await getCategory(id);
        if (data.code === "OK") {
          updateTree(new Map(tree).set(id, data.value || []));
        }
      }
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
