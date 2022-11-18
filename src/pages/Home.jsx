import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UpdateComment, UpdateUser, useFetch } from '../auth/functions';
import konu from "../assets/konu.jpeg";
import like from "../assets/like.jpg";
import commentimg from "../assets/comment.png";
import loading from "../assets/loading.gif";

const Home = () => {
  const {isLoading,cardList}=useFetch()
  const navigate = useNavigate();
  const [likethink, setLikeThink] = useState(false);
  const [comments, setComments] = useState("");

  const modalLike = (id) => {
    console.log(id);
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
  const addComment = (id) => {
    const commentArray = cardList?.find((produc) => produc.id == id);
    // console.log(cardList.filter((item)=>item.id == comment));
    console.log(commentArray);
    // console.log(id);
    commentArray?.comment.push(comments);
    UpdateComment(commentArray);
    // console.log(commentArray)
    // const ksd = cardList.map((item)=>item.comment)
    // console.log(ksd.shift());
  };
  return (
    <div>
      <div className="flex justify-center gap-2 mb-12 items-center">
        <span className="w-[200px] h-2 bg-black"></span>
        <p className="text-2xl uppercase">Dashboard</p>
        <span className="w-[200px] h-2 bg-black "></span>
      </div>
      {!isLoading ? (
        <div className="flex flex-wrap gap-6 justify-center items-center ">
          {!cardList?.length && (
            <p className="text-2xl uppercase mx-auto text-center">
              Blog does not exist Go to newBlog page to add
            </p>
          )}
          {cardList?.map((item, index) => (
            <div className="rounded-lg shadow-md  max-w-sm w-[350px] relative bg-gray-200 shadow-black mb-12">
              <div className="w-[90%] h-36">
                {item.ImgUrl ? (
                  <img
                    className="rounded-t-lg w-40 mx-auto"
                    src={item.ImgUrl}
                    alt=""
                  />
                ) : (
                  <img
                    className="rounded-t-lg w-48 mx-auto"
                    src={konu}
                    alt=""
                  />
                )}
              </div>
              <div
                className="p-4 mt-12 bg-gray-400 cursor-pointer"
                onClick={() => navigate("/detail", { state: item })}
              >
                <h5 className="text-gray-900 text-xl mb-2 font-bold uppercase">
                  {item.Title}
                </h5>
                <p className="text-gray-700 text-[12px] mb-4 w-[90%]  overflow-hidden text-ellipsis">
                  {item.history}
                </p>
                <p className="text-gray-700 text-base mb-4 w-[90%] text-ellipsis overflow-hidden whitespace-nowrap">
                  {item.content}
                </p>
              </div>
              <div className="flex justify-start gap-2 items-center mt-2 ml-4">
                <svg width="32" height="32" viewBox="0 0 256 256">
                  <path
                    fill="currentColor"
                    d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"
                    className="block"
                  />
                </svg>
                <p className="text-gray-700 text-xl text-ellipsis overflow-hidden font-bold ">
                  {item.email}
                </p>
              </div>

              <div className="flex justify-start items-center gap-8 ml-4 mt-2">
                <div className="flex justify-center items-center gap-2 mb-2">
                  <img
                    src={like}
                    alt=""
                    onClick={() => modalLike(item.id)}
                    className="w-10"
                  />
                  <p className="text-lg font-bold text-red-400">{item.like}</p>
                </div>
                <img
                  src={commentimg}
                  alt=""
                  className="w-10 mb-1"
                  data-bs-toggle="modal"
                  data-bs-target={`#${item.id}`}
                ></img>
                <div>
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
                            comment
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
                          value={comments.yourComment}
                          placeholder="write your comment"
                          onChange={(e) => setComments(e.target.value)}
                        ></textarea>
                        <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                          <button
                            type="button"
                            className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                            onClick={() => addComment(item.id)}
                          >
                            Add Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <img src={loading} alt="" className="mt-20 mx-auto" />
        </div>
      )}
    </div>
  );
}

export default Home