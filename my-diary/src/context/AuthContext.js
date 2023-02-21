import { createContext, useReducer } from "react";

const AuthContext = createContext();
const authReducer = (state,action) => {
  switch (action.type) {
    case "login" : //firebase에서 login과 회원가입은 같은 경우 
      return {...state, user: action.payload} //전개 구문 통한 객체 병합 (기존 정보 + 새로운 action.payload)
    default:
      return state;
  }
}

//context를 구독할 컴포넌트의 묶음 범위를 설정 
const AuthContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, {
    user : null
  });
  console.log('user state: ',state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}> 
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }