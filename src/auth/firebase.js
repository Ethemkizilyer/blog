import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { clearUser, setUser } from "../features/authSlice";
import {
  toastSuccessNotify,
  toastErrorNotify,
  toastWarnNotify,
} from "../helper/Toastfy";
const firebaseConfig = {
  apiKey: "AIzaSyDWHkfgsR2yptQy6wBPpcl7xL5TIbveMfQ",
  authDomain: "data-redux.firebaseapp.com",
  databaseURL: "https://data-redux-default-rtdb.firebaseio.com",
  projectId: "data-redux",
  storageBucket: "data-redux.appspot.com",
  messagingSenderId: "352299685131",
  appId: "1:352299685131:web:3a9ae49934cdf8e8273e0e",
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase;
export const auth = getAuth(firebase);
export const provider = new GoogleAuthProvider();
export const createUser = async (
  email,
  password,
  navigate,
  displayName,
  dispatch
) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    //? kullanıcı profilini güncellemek için kullanılan firebase metodu
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    dispatch(
      setUser({
        username: displayName,
        email: email,
        //   password: password,
      })
    );

    // SweetAlertsRegister();
    navigate("/");
    console.log(userCredential);
  } catch (error) {
    // SweetAlertsError(error);
    console.log(error);
  }
};

export const userObserver = (dispatch) => {
  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, displayName } = user;
      dispatch(
        setUser({
          username: displayName,
          email: email,
          //   password: password,
        })
      );
    } else {
      dispatch(clearUser());
      console.log("user signed out");
    }
  });
};
export const logOut = (navigate, dispatch) => {
  signOut(auth);
  dispatch(clearUser());
  toastWarnNotify("logged out successfully");
  navigate("/");
  localStorage.setItem("like",JSON.stringify(false))
  localStorage.setItem("not",JSON.stringify(""))
};
export const signIn = async (username, email, password, navigate, dispatch) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    dispatch(
      setUser({
        username: username,
        email: email,
        password: password,
      })
    );
    navigate("/");
    toastSuccessNotify("Login successfully!");
  } catch (error) {
    toastErrorNotify(error.message);
  }
};
export const signUpProvider = (navigate, dispatch) => {
  //? Google ile giriş yapılması için kullanılan firebase metodu
  const provider = new GoogleAuthProvider();
  //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
  signInWithPopup(auth, provider)
    .then(({ user }) => {
      dispatch(
        setUser({
          displayName: user.displayName,
          email: user.email,
        })
      );
      navigate("/");
      toastSuccessNotify("Login successfully!!");
    })
    .catch((error) => {
      // Handle Errors here.
      toastErrorNotify(error);
    });
};

export const signUpProviderFaceBook = (navigate, dispatch) => {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      // const credential = FacebookAuthProvider.credentialFromResult(result);
      // const accessToken = credential.accessToken
      dispatch(
        setUser({
          displayName: user.displayName,
          email: user.email,
        })
      );
      navigate("/");
      console.log("first");
      toastSuccessNotify("Login successfully!!");
    })
    .catch((error) => {
      toastErrorNotify(error);

    });
};
