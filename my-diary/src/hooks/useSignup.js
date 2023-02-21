import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { appAuth } from "../firebase/config";
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error,setError] = useState(null); //에러 정보
  const [isPending,setIsPending] = useState(false); //현재 서버와 통신 상태 
  const { dispatch } = useAuthContext();

  const signup = (email,password,displayName) => {
    setError(null); 
    setIsPending(true);

    createUserWithEmailAndPassword(appAuth,email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);

      if(!user) {
        throw new Error("회원가입에 실패했습니다.");
      }

      updateProfile(appAuth.currentUser,{ displayName })
      .then(()=> {
        dispatch({type:"login", payload: user});
        setError(null);
        setIsPending(false);
      }).catch((err)=>{
        setError(err.message);
        setIsPending(false);
      });
    }).catch((err) => {
      setError(err.message);
      setIsPending(false);
    });
  }
  return{error,isPending,signup}

}