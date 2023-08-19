import React, { useEffect } from "react";
import { Link, Navigate, useNavigate, NavLink } from "react-router-dom";
import "./sidebar.css";
import logo from "../../Images/Screenshot_18.jpg";
import { useDispatch, useSelector } from "react-redux"
//importamos actions 
import { loadCurrentUser } from "../../Redux/actions";

export default function Sidebar() {
  //importamos estados globales 
  const currentUser = useSelector(store => store.currentUser)
  console.log(currentUser);
  let token = localStorage.getItem('authToken');
  console.log("tokennnn", token)
  const navigate = useNavigate();
  
  let tokenId = '';
  let tokenRoll = '';

  if(token || null || ''){
    const tokenData = token.split('.').at(1)
    console.log("tokenData", tokenData)
    const decodedData = window.atob(tokenData)
    const jsonObject = JSON.parse(decodedData);

  //   console.log("decodedData", decodedData)
  //   console.log('parseJson', jsonObject)
  //  console.log('id', jsonObject.id)

    tokenId = jsonObject.id
    tokenRoll = jsonObject.roll
  }
  //useEffect
  useEffect(()=>{

  },[])

  console.log("tokenId", tokenId)
  console.log('tokenRoll', tokenRoll)

  // eyJpZCI6ImFiYzA2YTQzLWI5NDAtNGM3MC1hYTgzLTE0YTM2MDQxYjU0NSIsInJvbGwiOiJ1c3VhcmlvIiwibm9tYnJlIjoiZ2FicmllbCIsImFwZWxsaWRvIjoiZmVybmFuZGV6IiwiaWF0IjoxNjkyMTYyMTUxfQ

  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiYzA2YTQzLWI5NDAtNGM3MC1hYTgzLTE0YTM2MDQxYjU0NSIsInJvbGwiOiJ1c3VhcmlvIiwibm9tYnJlIjoiZ2FicmllbCIsImFwZWxsaWRvIjoiZmVybmFuZGV6IiwiaWF0IjoxNjkyMTYyMTUxfQ.oYvMSurD_UtqipUnTRx2HQcdyyITjuSdBQ9A4q8_QH0"

  const DetailAcount = (id) => {
      navigate(`/account/client/${id}`)
  }


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo_conteiner">
          <img className="navbar-logo" src={logo} alt="" />
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/home">Home</Link>
          </li>
          {/* <li className="nav-item"><Link to="/detail">Perfil</Link></li> */}
          <li className="nav-item">
            <Link to="/nosotros">About us</Link>
          </li>

          {
            !tokenId ? <li className="nav-item">
            <NavLink to="/form">Sign up</NavLink>
          </li> 
          : <NavLink className="nav-item-perfil" to={tokenRoll == "usuario" ? `/account/client/${tokenId}` 
          : `/account/${tokenId}`}>
            {currentUser ? <img className="foto_perfil" src={currentUser.foto} alt="" /> : "Perfil" }
            </NavLink>
          }

        </ul>
      </div>
    </nav>
  );
}
