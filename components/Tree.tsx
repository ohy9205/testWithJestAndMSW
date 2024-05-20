"use client";

import useTree from "@/hooks/useTree";
import { MouseEvent } from "react";
import Button from "./Button";
import TextInput from "./TextInput";

type Props = {
  bgColor?: "skyblue" | "orange";
};

const Tree = ({ bgColor }: Props) => {
  const {
    getList,
    create,
    onCreateButtonHandler,
    data: { tree, openStatusCategory, pick, isShowNewFolderInput },
  } = useTree();

  // 카테고리 트리 렌더
  const renderCategories = (id: string) => {
    const categories = tree.get(id) || []; // tree Map에서 클릭한 카테고리 데이터를 가져옴

    return categories.map((it: any) => (
      <li
        key={it.id}
        className="cursor-pointer "
        style={{ paddingLeft: `${it.data.depth !== 1 ? "50px" : "0px"}` }}>
        <div className="flex gap-4">
          <div
            onClick={(event: MouseEvent<HTMLElement>) => {
              event.stopPropagation();
              getList(it.id);
            }}>
            <span>{openStatusCategory[it.id] ? "▼ " : "▶ "}</span>
            {it.text}
          </div>
          <Button text="추가" onClick={() => onCreateButtonHandler(it.id)} />

          {isShowNewFolderInput && pick === it.id && (
            <TextInput>
              {(value: string) => (
                <Button
                  text="생성"
                  onClick={() => create(it.id, it.data.depth, value, "0")}
                />
              )}
            </TextInput>
          )}
        </div>

        {openStatusCategory[it.id] && tree.has(it.id) && (
          // 열려있는 카테고리만 렌더링함
          <ul>{renderCategories(it.id)}</ul>
        )}
      </li>
    ));
  };

  return (
    <div
      className={`
          ${bgColor === "skyblue" ? "bg-blue-200" : ""}
          ${bgColor === "orange" ? "bg-orange-300" : ""}
        `}>
      {tree && <ul>{renderCategories("0")}</ul>}
    </div>
  );
};

export default Tree;
