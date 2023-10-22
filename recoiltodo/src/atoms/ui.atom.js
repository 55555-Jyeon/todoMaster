// 02. 폴더 생성 (이름은 store, atom 등)
// ui 관련 atom 모음

import { atom } from "recoil";

export const addModalAtom = atom({
  key: "addModalAtom",
  default: false,
});
