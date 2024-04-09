"use client";

import { getCategory } from "@/apis/getCategory";
import { MouseEvent, useEffect, useState } from "react";

type Props = {
  bgColor?: "skyblue" | "orange";
};

const Tree = ({ bgColor }: Props) => {
  const [tree, setTree] = useState(new Map()); // 카테고리 트리
  const [pick, setPick] = useState("0"); // 최종 클릭한 카테고리
  const [openStatus, setOpenStatus] = useState([]); // 카테고리 여닫힘 체크

  // 카테고리 클릭 핸들러
  const clickHandler = (
    e: MouseEvent<HTMLLIElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation(); // 버블링방지
    pick !== id && setPick(id); // 현재 pick과 다른 경우에만 pick을 변경
    setOpenStatus(toggleOpenstatus(id, openStatus)); // 카테고리 오픈 토클
  };

  // 카테고리 트리 렌더
  const renderCategories = (id: string) => {
    const categories = tree.get(id) || []; // tree Map에서 클릭한 카테고리 데이터를 가져옴

    return categories.map((it: any) => (
      <li
        key={it.id}
        onClick={(e) => clickHandler(e, it.id)}
        className="cursor-pointer"
        style={{ paddingLeft: `${it.data.depth !== 1 ? "50px" : "0px"}` }}>
        {openStatus[it.id] ? "▼ " : "▶ "}
        {it.text}
        {openStatus[it.id] && tree.has(it.id) && (
          // 열려있는 카테고리만 렌더링함
          <ul>{renderCategories(it.id)}</ul>
        )}
      </li>
    ));
  };

  // pick바뀔때마다 tree업데이트
  useEffect(() => {
    const fetcher = async (pick: string) => {
      if (!tree.has(pick)) {
        const data = await getCategory(pick); // 카테고리가져옴
        setTree((prev) => new Map(prev).set(pick, data)); // tree업데이트
        setOpenStatus((prev) => ({ ...prev, [pick]: true })); // 클릭한 카테고리를 openStatus에 저장
      }
    };

    fetcher(pick);
  }, [pick]);

  return (
    <div
      className={`
          ${bgColor === "skyblue" ? "bg-blue-200" : ""}
          ${bgColor === "orange" ? "bg-orange-300" : ""}
        `}>
      <ul>{renderCategories("0")}</ul>
    </div>
  );
};

// 카테고리 open/close
const toggleOpenstatus = (id: string, status: any) => {
  return { ...status, [id]: !status[id] };
};

export default Tree;
