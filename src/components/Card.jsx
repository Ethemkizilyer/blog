import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import konu from "../assets/konu.jpeg";
import { UpdateUser, useFetch } from "../auth/functions";
import like from "../assets/like.png";
import commentimg from "../assets/comment.png";
import { useDispatch, useSelector } from "react-redux";
import { toastErrorNotify } from "../helper/Toastfy";

const Card = ({ item }) => {
  const navigate = useNavigate();
  const [likethink, setLikeThink] = useState();

  const { isLoading, cardList } = useFetch();
  const [comments, setComments] = useState({yazar:"",coment:"",zaman:""});
  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  useEffect(() => {
    setLikeThink(JSON.parse(localStorage.getItem("like")) && true);
  }, []);
  const modalLike = (id) => {
    setLikeThink(localStorage.setItem("like", JSON.stringify(!likethink)));
    console.log(id);

    console.log(likethink);
    setLikeThink(!likethink);
    if (!likethink) {
      const mod = cardList?.find((product) => product.id === id);

      mod.like += 1;
      UpdateUser(mod);
    } else {
      const mod = cardList?.find((product) => product.id === id);
      mod.like -= 1;
      UpdateUser(mod);
    }
  };

  useEffect(()=>{const yazan = user?.username || "Anonim"; 
setComments({ ...comments, yazar: yazan })},[user])

  const addComment = (id) => {
    const commentArray = cardList?.find((produc) => produc.id == id);
    console.log(commentArray);
    
    console.log(user);
   
      commentArray?.comment.push({
        ...comments,
        zaman: new Date().toLocaleString("tr-TR", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      });
    UpdateUser(commentArray);
setComments({ ...comments, coment: "" });
  };
  return (
    <>
      <div className="rounded-lg shadow-md  max-w-sm w-[350px] relative bg-gray-200 shadow-black mb-12">
        <div className="w-[100%]">
          <div
            className=" h-36 "
            onClick={() => navigate("/detail", { state: item })}
          >
            {item.ImgUrl ? (
              <img
                className="rounded-t-lg w-[21rem] h-36 mx-auto"
                src={item.ImgUrl}
                alt={item.ImgUrl}
              />
            ) : (
              <img className="rounded-t-lg w-48 mx-auto" src={konu} alt="" />
            )}
          </div>
          <div className="p-6 flex flex-col justify-start">
            <h5 className="text-gray-900 text-xl font-medium mb-2">
              {item.Title}
            </h5>
            <p>{item.history}</p>
            <p className="text-gray-700 text-base mb-4 text-ellipsis overflow-hidden whitespace-nowrap">
              {item.content}
            </p>

            <p className="text-gray-600 text-xs flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 256 256">
                <path
                  fill="currentColor"
                  d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"
                  className="block"
                />
              </svg>
              {item.email}
            </p>
            <div className="flex justify-between gap-2 items-center mt-2 ml-4">
              <div className="flex justify-center items-center gap-2 mb-2">
                <img
                  src={like}
                  alt=""
                  onClick={() => modalLike(item.id)}
                  className="w-10"
                />
                <p className="text-lg font-bold text-red-400">{item.like}</p>
              </div>
              <div className="flex justify-center items-center gap-2 mb-2">
                <img
                  src={commentimg}
                  alt=""
                  className="w-10 mb-1"
                  data-bs-toggle="modal"
                  data-bs-target={`#${item.id}`}
                ></img>
                <p className="text-lg font-bold text-red-400">
                  {item.comment.length - 1}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id={`${item.id}`}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalLabel"
              >
                Message
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <textarea
              className="modal-body relative p-4 outline-none"
              value={comments.coment}
              placeholder="write your comment"
              onChange={(e) =>
                setComments({ ...comments, coment: e.target.value })
              }
            ></textarea>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Close
              </button>
              <button
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                onClick={() => addComment(item.id)}
                data-bs-dismiss="modal"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
