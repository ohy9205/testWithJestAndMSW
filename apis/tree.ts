import { FetchAdapter } from "@/utils/fetchAdapter";

const BASE =
  "https://www.bj-sup.kr/application/hoffconts_member/contents_manage/exam_manage/exam_manage";

export const getCategory = async (pId: string) => {
  const fetcher = new FetchAdapter();
  fetcher.setBody({ pId: pId });
  const data = await fetcher.fetching(`${BASE}/categChildList.json`);
  return data;
};

export const createCategory = async (
  pParentId: string,
  pDepth: string,
  pText: string,
  pOrder: string
) => {
  console.log("카테고리 생성", pParentId, pDepth, pText, pOrder);
  const fetcher = new FetchAdapter();
  fetcher.setBody({ pParentId, pDepth, pText, pOrder });
  const data = await fetcher.fetching(`${BASE}/createCategItem.json`);
  return data;
};
