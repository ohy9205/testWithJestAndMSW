import useTextInput from "@/hooks/useTextInput";
import React from "react";

type Props = {
  children?: (value: string) => React.ReactNode;
};

const TextInput = ({ children }: Props) => {
  const {
    data: { value },
    changeValue,
  } = useTextInput();

  if (children) {
    return (
      <div>
        <input
          type="text"
          value={value}
          placeholder="카테고리명"
          onChange={(e) => changeValue(e.target.value)}
        />
        {children(value)}
      </div>
    );
  } else {
    return (
      <input
        type="text"
        value={value}
        placeholder="카테고리명"
        onChange={(e) => changeValue(e.target.value)}
      />
    );
  }
};

export default TextInput;
