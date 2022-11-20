import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";
import firebase from "./firebase";

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cardList, setCardList] = useState();
  useEffect(() => {
    const db = getDatabase(firebase);
    const userRef = ref(db, "user/");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      const userArray = [];
      for (let id in data) {
        userArray.push({ id, ...data[id] });
      }
      setCardList(userArray);
      setIsLoading(false);
    });
  }, []);
  return { isLoading, cardList };
};
export const AddUser = (info, user, history, like, comment) => {
  const db = getDatabase(firebase);
  const userRef = ref(db, "user/");
  const newUserRef = push(userRef);
  set(newUserRef, {
    Title: info?.title,
    ImgUrl: info?.imgUrl,
    content: info?.content,
    email: user?.email,
    history: history,
    like: like,
    comment: comment,
  });
};

export const UpdateUser = (mod) => {
  const db = getDatabase(firebase);
  const userRef = ref(db, "user/");
  const updates = {};
  updates["user/" + mod.id] = mod;
  return update(ref(db), updates);
};

export const DeleteUser = (id) => {
  const db = getDatabase(firebase);
  // const userRef=ref(db,"user/")
  remove(ref(db, "user/" + id));
};


