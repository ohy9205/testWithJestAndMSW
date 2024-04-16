import { HttpResponse, http } from "msw";

// request를 가로채는 역할
export const handlers = [
  http.post(
    "https://www.bj-sup.kr/application/hoffconts_member/contents_manage/exam_manage/exam_manage/categChildList.json",
    async ({ request }) => {
      // const pId = Object.fromEntries(request.body?.);
      const pId = (await request.formData()).get("pId");
      console.log(`pid :: `, pId);
      return HttpResponse.json({
        value: [
          { id: "1", name: "Category 1", parentId: pId, data: { depth: 1 } },
          { id: "2", name: "Category 2", parentId: pId, data: { depth: 1 } },
          { id: "2", name: "Category 3", parentId: pId, data: { depth: 1 } },
        ],
      });
    }
  ),
];
