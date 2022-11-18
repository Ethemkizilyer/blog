import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddUser, useFetch } from '../auth/functions';
import { toastWarnNotify } from '../helper/Toastfy';



const New = () => {

      const navigate = useNavigate();
      const initialValues = {
        title: "",
        imgUrl: "",
        content: "",
      };
      const { user } = useSelector((state) => state.auth);
      const [info, setInfo] = useState(initialValues);
      const [count, setCount] = useState();
      const [comment, setComment] = useState(["sadık"]);
      const [like, setLike] = useState(0);
      const blogset = (e) => {
        e.preventDefault();
        let asd = new Date();
        let date = new Date(
          `${asd.getFullYear()}-${asd.getMonth() + 1}-${asd.getDate()}`
        );
        let history = date.toLocaleDateString("tr-TR", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        if (info.title && info.content && info.imgUrl) {
          if (count?.length > 1) {
            setComment(history);
            AddUser(info, user, history, like, comment);
            setInfo(initialValues);
            navigate("/");
          } else {
            toastWarnNotify("Contente minimum 100 harf yazılmalıdır");
          }
        } else {
          toastWarnNotify("Form Boş Bırakılamaz");
        }
        
      };

      const { isLoading, cardList } = useFetch();
      useEffect(() => {
        setCount(info.content.split(""));
      }, [info]);

// const blogset=(e)=> {
//     e.preventDefault()
// navigate("/")
// }


  return (
    <div className="w-[100%] h-[90vh] p-4 border">
      <div className="p-6 rounded-lg shadow-lg bg-gray-600 mx-auto max-w-md block">
        <form onSubmit={blogset}>
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder="Title"
              value={info.title}
              onChange={(e) => setInfo({ ...info, title: e.target.value })}
            />
          </div>
          <div className="form-group mb-6">
            <input
              type="email"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput8"
              placeholder="Image URL"
              value={info.imgUrl}
              onChange={(e) => setInfo({ ...info, imgUrl: e.target.value })}
            />
          </div>
          <div className="relative">
            <textarea
              placeholder="Content *"
              value={info.content}
              onChange={(e) => setInfo({ ...info, content: e.target.value })}
              className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
              id="exampleFormControlTextarea13"
              rows={3}
              
            
            />
            <p className="absolute bottom-4 right-4">
              {`3000/ ${count?.length}`}
            </p>
          </div>

          <button
           onClick={blogset}
            className="
      w-full
      px-6
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
      ease-in-out"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default New