import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import konu from "../assets/konu.jpeg";

import like from "../assets/like.png";
import commentimg from "../assets/comment.png";

import blog from "../assets/konu.jpeg";

import { DeleteUser, UpdateUser, useFetch } from "../auth/functions";
import { toastSuccessNotify, toastWarnNotify } from "../helper/Toastfy";

const Details = () => {
  const initialValues = {
    title: "",
    imgUrl: "",
    content: "",
  };
  const { user } = useSelector((state) => state.auth);
  const [editCard, setEditCard] = useState(initialValues);
 
  const { state } = useLocation();

  const navigate = useNavigate();
  const [likethink, setLikeThink] = useState();

  const { isLoading, cardList } = useFetch();
 const [asd,setAsd]= useState(state?.comment.length)
 const [as,setAs]= useState(state?.like)
//  const [not,setNot]= useState(state?.comment)
 const [not, setNot] = useState(state?.comment || JSON.parse(localStorage.getItem("not"))  );
 

 const [comments, setComments] = useState({ yazar: "", coment: "" });
  const deleteCard = (id) => {
    DeleteUser(id);
    navigate("/");
    toastWarnNotify("Delete successfully");
  };
  const UpdateUse = (id) => {
    const mod = cardList.find((produc) => produc.id == id);
    mod.ImgUrl = editCard.imgUrl;
    mod.Title = editCard.title;
    mod.content = editCard.content;
    UpdateUser(mod);
    navigate("/");
    toastSuccessNotify("Edit succesfully");
  };
  console.log(state)

  // console.log(user);

  useEffect(() => {
      // setNot(JSON.parse(localStorage.getItem("not")))
     
    setLikeThink(JSON.parse(localStorage.getItem("like")) && true);
  }, []);
  const modalLike = (id) => {
    setLikeThink(localStorage.setItem("like", JSON.stringify(!likethink)));
    console.log(id);

    console.log(likethink);
    setLikeThink(!likethink);
    if (!likethink) {
      const mod = cardList?.find((product) => product.id === id);
setAs(as+1)
      mod.like += 1;
      UpdateUser(mod);
    } else {
      const mod = cardList?.find((product) => product.id === id);
      mod.like -= 1;
      setAs(as - 1);
      UpdateUser(mod);
    }
  };
     
useEffect(() => {
  const yazan = user?.username || "Anonim";
  setComments({ ...comments, yazar: yazan });
}, [user,state]);


// ****************
  const addComment = (id) => {
    
 const commentArray = cardList?.find((produc) => produc.id == id);
 console.log(commentArray);
 setNot([...not,comments])
setAsd(asd+1)
 console.log(user);

 commentArray?.comment.push(comments);
 UpdateUser(commentArray);
localStorage.setItem("not", JSON.stringify(commentArray.comment));

  };

  // *****************************
console.log(not);
  return (
    <div className="flex item-center justify-around">
      <div className="flex items-center  flex-col">
        <div className="rounded-lg shadow-md w-[550px] h-[550px] relative bg-gray-200 shadow-black mb-12">
          <div className="w-[90%] h-36 mx-auto">
            {state?.ImgUrl ? (
              <img
                className="rounded-t-lg w-[21rem] h-48 mx-auto"
                src={state?.ImgUrl}
                alt=""
              />
            ) : (
              <img className="rounded-t-lg w-48 mx-auto" src={konu} alt="" />
            )}
          </div>
          <div className="p-4 mt-12 bg-gray-400">
            <h5 className="text-gray-900 text-xl mb-2 font-bold uppercase">
              {state?.Title}
            </h5>
            <p className="text-gray-700 text-[12px] mb-4 w-[90%]  overflow-hidden text-ellipsis">
              {state?.history}
            </p>
            <p
              style={{
                width: "95%",
                wordWrap: "break-word",
              }}
              className="text-md font-bold overflow-auto h-32"
            >
              {state?.content}
            </p>
          </div>
          <div className="flex justify-start gap-2 items-center mt-4 ml-4">
            <svg width="32" height="32" viewBox="0 0 256 256">
              <path
                fill="currentColor"
                d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"
                className="block"
              />
            </svg>
            <p className="text-gray-700 text-lg text-ellipsis overflow-hidden font-bold ">
              {state?.email}
            </p>
          </div>

          <div className="flex justify-start gap-2 items-center mt-2 ml-4">
            <div className="flex justify-center items-center gap-2 mb-2">
              <img
                src={like}
                alt=""
                onClick={() => modalLike(state?.id)}
                className="w-10"
              />
              <p className="text-lg font-bold text-red-400">{as}</p>
            </div>

            <div className="flex justify-center items-center gap-2 mb-2">
              <img
                src={commentimg}
                alt=""
                className="w-10 mb-1"
                // data-bs-toggle="modal"
                // data-bs-target={`#${state?.id}`}
              ></img>
              <p className="text-lg font-bold text-red-400">
                {not ? not.length - 1 : asd - 1}
              </p>
            </div>
          </div>
          <div>
            <input
              className="w-[85%]
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={comments?.coment}
              placeholder="Yorum..."
              onChange={(e) =>
                setComments({ ...comments, coment: e.target.value })
              }
              type="text"
            />
            <button
              type="button"
              class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => addComment(state?.id)}
            >
              Ekle
            </button>
          </div>
        </div>
        {user.email == state?.email ? (
          <div className="flex gap-4">
            {/* <button className="w-[120px] bg-slate-300 py-2 px-4 rounded-md text-lg font-bold text-slate-800 hover:text-white duration-300 "onClick={()=>upDateCard(state)}>Edit</button> */}
            <div>
              {/* Button trigger modal */}
              <button
                type="button"
                className="w-[120px] bg-slate-300 py-2 px-4 rounded-md text-lg font-bold text-slate-800 hover:text-white duration-300 "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Edit
              </button>
              {/* ***********************Modal**************************** */}
              {/* <div
                className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id={`${state?.id}`}
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
                      value={comments?.coment}
                      placeholder="write your comment"
                      onChange={(e) =>
                        setComments({ ...comments, coment: e.target.value })
                      }
                    ></textarea>
                    <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                      <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Close
                      </button>
                      <button
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                        onClick={() => addComment(state?.id)}
                        data-bs-dismiss="modal"
                      >
                        Add Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* ************************************************** */}
              <div
                className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog relative w-auto pointer-events-none">
                  <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                      <h5
                        className="text-xl leading-normal text-gray-800 font-bold"
                        id="exampleModalLabel"
                      >
                        Edit Blog
                      </h5>
                      <button
                        type="button"
                        className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center mt-20 gap-4">
                      <img src={blog} alt="" />
                      <input
                        type="text"
                        placeholder="Title *"
                        className="w-[400px] border-4 outline-none py-2 indent-2 shadow-md shadow-black rounded-md"
                        value={editCard.title}
                        onChange={(e) =>
                          setEditCard({ ...editCard, title: e.target.value })
                        }
                      />
                      <input
                        type="text"
                        placeholder="Image URL *
  "
                        className="w-[400px] border-4 outline-none py-2 indent-2 shadow-md shadow-black rounded-md"
                        value={editCard.imgUrl}
                        onChange={(e) =>
                          setEditCard({ ...editCard, imgUrl: e.target.value })
                        }
                      />
                      <div className="relative">
                        <textarea
                          name=""
                          id=""
                          cols="30"
                          rows="10"
                          className=" w-[400px] h-[300px] border-4 outline-none py-2 indent-2 shadow-md shadow-black rounded-md"
                          placeholder="Content *"
                          value={editCard.content}
                          onChange={(e) =>
                            setEditCard({
                              ...editCard,
                              content: e.target.value,
                            })
                          }
                          wrap="hard"
                        ></textarea>

                        <p className="absolute bottom-4 right-4">
                          {/* {`3000/ ${count?.length}`} */}
                        </p>
                      </div>
                    </div>
                    <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                      <button
                        type="button"
                        className="px-6
            py-2.5
            bg-purple-600
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-purple-700 hover:shadow-lg
            focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-purple-800 active:shadow-lg
            transition
            duration-150
            ease-in-out"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="px-6
        py-2.5
        bg-blue-600
        text-white
        font-medium
        text-xs
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-blue-700 hover:shadow-lg
        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-blue-800 active:shadow-lg
        transition
        duration-150
        ease-in-out
        ml-1"
                        onClick={() => UpdateUse(state.id)}
                        data-bs-dismiss="modal"
                      >
                        Save Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="w-[120px] bg-slate-300 py-2 px-6 rounded-md text-lg font-bold text-slate-800 hover:text-white duration-300 "
              onClick={() => deleteCard(state.id)}
            >
              Delete
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      {state.comment.length > 1 && (
        <div>
          <h4 className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg bg-blue-600 text-white text-center">
            MESSAGE
          </h4>
          <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
            {!not
              ? state?.comment.slice(1).map((item, index) => (
                  <li
                    className="px-6 py-2 border-b border-gray-200 w-full flex justify-between"
                    key={index}
                  >
                    <span className="inline-block">
                      {index + 1}-{item.coment}
                    </span>
                    <span className="inline-block">{item.yazar}</span>
                  </li>
                ))
              : not?.slice(1).map((item, index) => (
                  <li
                    className="px-6 py-2 border-b border-gray-200 w-full flex justify-between"
                    key={index}
                  >
                    <span className="inline-block">
                      {index + 1}-{item.coment}
                    </span>
                    <span className="inline-block">{item.yazar}</span>
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Details;
