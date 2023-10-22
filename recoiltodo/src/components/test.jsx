import { useRecoilState } from "recoil";
import { addModalAtom } from "../atoms/ui.atom";

const Test = () => {
  // 03. atom 만든 거 사용해보기
  const [isOpenAddModal, setIsOpenAddModal] = useRecoilState(addModalAtom);
  const onToggleState = () => {
    setIsOpenAddModal((prev) => !prev);
  };

  return (
    <div>
      {isOpenAddModal && <div>ADD</div>}
      <button onClick={onToggleState}>toggle</button>
    </div>
  );
};

export default Test;
