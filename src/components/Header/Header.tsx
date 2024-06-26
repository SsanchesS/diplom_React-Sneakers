import React, { FC,useState,useEffect } from 'react';
import {Link} from 'react-router-dom'
import s from './Header.module.sass'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import {overlaySwitch} from "../../store/reducers/SneakersSlice"
import { get_sneakers_basket_full } from '../../service/servise';

interface proops{
   admin?: boolean
}
const Header:FC<proops>=(p)=>{
   const navigate = useNavigate()
   const dispatch = useAppDispatch()
   const user = useAppSelector(state=>state.UserReducer)
   const sneakers = useAppSelector(state=>state.SneakersReducer)

   const [ItemsPrice,setItemsPrice] = useState(0)

   const sneakers_basket = sneakers.sneakers_basket
   const sneakers_basket_full = sneakers.sneakers && sneakers.sneakers_basket ? get_sneakers_basket_full(sneakers.sneakers,sneakers.sneakers_basket) : []
   useEffect(()=>{
      const sum = sneakers_basket_full?.reduce((acc,i)=>acc+i.price,0) || 0
      setItemsPrice(sum)
   },[sneakers_basket]) 

   const openbasket=()=>{
      if(!user.id){
         navigate("/auth",{replace:true})
      }else{
         dispatch(overlaySwitch(true))
      }      
   }
return(
<div className={`${s.header}`}>
   <div className={`${s.header_left}`}>
      <Link className={`${s.logo}`} to="/"><img src="img/logo.svg" alt="logo"></img></Link>
      <div className={`${s.text}`}>
         <h1 className="flex"><div className={"w_y"}>К</div><div className={"b_y"}>Р</div><div className={"w_y"}>О</div><div className={"b_y"}>С</div><div className={"b_y"}>С</div><div className={"w_y"}>О</div><div className={"b_y"}>В</div><div className={"w_y"}>К</div><div className={"b_y"}>И</div></h1>
         <p>Магазин лучших кроссовок</p>
      </div>
   </div>
   <div className={`${s.header_right}`}>
      {p.admin?
      <div className={`${s.right_right}`}>
         <Link className={`${s.user}`} to={`${user.id?"/User":"/auth"}`}></Link>
      </div>
      :
      <>
         <div className={`${s.right_left}`}>
            <button className={`${s.basket}`} onClick={openbasket}></button>       
            <p>{ItemsPrice} руб.</p>
         </div>
         <div className={`${s.right_right}`}>
            <Link className={`${s.user}`} to={`${user.id?"/User":"/auth"}`}></Link>
         </div>
      </>
      }      
   </div>
</div>
)}
export default Header