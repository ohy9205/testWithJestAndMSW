export const getCategory = async (pId: string) => {
  const res = await fetch(
    "https://www.bj-sup.kr/application/hoffconts_member/contents_manage/exam_manage/exam_manage/categChildList.json",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: `pId=${pId}`,
      // cache: "no-store",
    }
  );
  const data = await res?.json();
  return data.value || [];
};
