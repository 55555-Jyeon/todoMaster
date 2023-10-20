// 09. use-modal 파일 생성
// true, false를 번갈아가는 logic은 재사용 가능성이 있으므로 custom hook화
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
