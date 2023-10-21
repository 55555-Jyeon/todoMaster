import { useState } from "react";

const useModal = () => {
  const [state, setState] = useState();
  const onVisibleModal = () => {
    setState(true);
  };
  const onHiddenModal = () => {
    setState(false);
  };

  return { state, onVisibleModal, onHiddenModal };
};
export default useModal;
