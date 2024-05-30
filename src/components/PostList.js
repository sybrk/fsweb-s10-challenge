import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

const PostList = () => {
  let notlar = useSelector(store => store.notlar);
  notlar.sort((a,b) => new Date(b.date)  - new Date(a.date))

  return notlar.length === 0 ? (
    <div className="beyazKutu text-center p-6">Hiç notunuz yok</div>
  ) : (
    <div>
      {notlar.map((not) => (
        <Post item={not} key={not.id} />
      ))}
    </div>
  );
};

export default PostList;
