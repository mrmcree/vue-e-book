//mutation 负责修改state
import * as types from "./mutation-types";
const mutations = {
  [types.GET_BOOK_DETAIL](state, value) {
    state.book.detail.push(value);
    if (state.book.detail.length > 10) {
      state.book.detail = state.book.detail.slice(1);
    }
    if (state.book.title === "")
      state.book.title = state.book.detail[0].chapter;
  },
  [types.CHANGE_BOOK_TITLE](state, value) {
    state.book.title = value;
    // console.log(value)
  }
};
export default mutations;
