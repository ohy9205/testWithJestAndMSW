import { HttpResponse, http } from "msw";

const BASE_URL =
  "https://www.bj-sup.kr/application/hoffconts_member/contents_manage/exam_manage/exam_manage";

// request를 가로채는 역할
export const handlers = [
  http.post(`${BASE_URL}/categChildList.json`, async ({ request }) => {
    const pId = (await request.formData()).get("pId");
    if (pId === "0") {
      return HttpResponse.json({
        value: [
          { id: "1", text: "Category 1", parent: pId, data: { depth: 1 } },
          { id: "2", text: "Category 2", parent: pId, data: { depth: 1 } },
          { id: "3", text: "Category 3", parent: pId, data: { depth: 1 } },
        ],
      });
    } else if (pId === "3") {
      return HttpResponse.json({
        value: [
          {
            id: "4",
            text: "Category 3-1",
            parent: pId,
            data: { depth: 2 },
          },
          {
            id: "5",
            text: "Category 3-2",
            parent: pId,
            data: { depth: 2 },
          },
          {
            id: "6",
            text: "Category 3-3",
            parent: pId,
            data: { depth: 2 },
          },
        ],
      });
    }
  }),
  http.post(`${BASE_URL}/createCategItem.json`, async ({ request }) => {
    const pText = (await request.formData()).get("pText");
    if (pText !== "") {
      console.log("있음");
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
