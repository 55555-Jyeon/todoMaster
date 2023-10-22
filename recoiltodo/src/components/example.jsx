import { useRecoilValue } from "recoil";
import { addModalAtom } from "../atoms/ui.atom";

const Example = () => {
  // 04. value만 사용할 경우 (오직 값만 가져오는 경우)
  const isOpenAddModal = useRecoilValue(addModalAtom);
  // 05. set만 사용할 경우 (오직 수정하는 부분만 가져오는 경우)
  // const setIsOpenAddModal = useSetRecoilState(addModalAtom);

  return <div>{isOpenAddModal ? "OPEN" : "CLOSE"}</div>;
};
export default Example;
