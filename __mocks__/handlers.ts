import { HttpResponse, http } from "msw";

const BASE_URL =
  "https://www.bj-sup.kr/application/hoffconts_member/contents_manage/exam_manage/exam_manage";

// category list
const CATEGORY = {
  value: [
    { id: "1", text: "Category 1", parent: "0", data: { depth: 1 } },
    { id: "2", text: "Category 2", parent: "0", data: { depth: 1 } },
    { id: "3", text: "Category 3", parent: "0", data: { depth: 1 } },
    {
      id: "4",
      text: "Category 3-1",
      parent: "3",
      data: { depth: 2 },
    },
    {
      id: "5",
      text: "Category 3-2",
      parent: "3",
      data: { depth: 2 },
    },
    {
      id: "6",
      text: "Category 3-3",
      parent: "3",
      data: { depth: 2 },
    },
  ],
};

// request를 가로채는 역할
export const handlers = [
  // 카테고리 가져옴
  http.post(`${BASE_URL}/categChildList.json`, async ({ request }) => {
    const pId = (await request.formData()).get("pId") as string;

    if (pId) {
      const filtered = CATEGORY.value.filter((it) => it.parent === pId);
      return HttpResponse.json({ value: filtered });
    }
  }),

  // 카테고리 생성
  http.post(`${BASE_URL}/createCategItem.json`, async ({ request }) => {
    const formData = await request.formData();
    if (
      formData.get("pText") !== "" &&
      formData.get("pParentId") &&
      formData.get("pDepth")
    ) {
      console.log("있음");

      // CATEGORY에 새 카테고리 추가
      CATEGORY.value.push({
        id: "12345",
        text: formData.get("pText") as string,
        parent: formData.get("pParentId") as string,
        data: { depth: Number(formData.get("pDepth")) },
      });

      return HttpResponse.json({
        code: "OK",
        value: {
          id: "12345",
        },
      });
    } else {
      console.log("없음");
      // pText값이 없으면 code: 'EXCEPTION' 반환?
      return HttpResponse.json({
        code: "EXCEPTION",
        value: null,
      });
    }
  }),
];
