//action 负责异步操作
import * as types from "./mutation-types";
import http from "../api/http";
export const getBookDetail = (
  { commit, state },
  { url = undefined, route }
) => {
  let link = encodeURIComponent(route.query.link);
  if (url) {
    link = encodeURIComponent(url);
  }
  http({ url: `book/${link}` }).then(result => {
    commit(types.GET_BOOK_DETAIL, result.data);
  });
};
