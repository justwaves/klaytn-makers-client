import React from "react";
import Header from "components/common/Header/Header";
import PostList from "components/posts/PostList/PostListContainer";
import Pagination from "components/posts/Pagination/PaginationContainer";

export default () => (
  <>
    <Header />
    <PostList />
    <Pagination />
  </>
);
