import { useState } from "react";

const useTextInput = () => {
  const [value, setValue] = useState("");

  return {
    data: { value },
    changeValue: (newValue: string) => setValue(newValue),
  };
};

export default useTextInput;
