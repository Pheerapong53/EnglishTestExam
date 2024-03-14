import React from 'react'
import { useSelector } from "react-redux";
import Notfound404 from './Notfound404';

const UserLoginRoute = ({children}) => {
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.user.token;
  // console.log("UserRoute", token);
  return user && user.user.email && token ? (
    <>
      {children}
    </>
  ) : (
    <Notfound404 text="No login" />
  );
}

export default UserLoginRoute