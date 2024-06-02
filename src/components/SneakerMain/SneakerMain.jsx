import React,{useState,useEffect} from 'react';
import Sneaker from './Sneaker/Sneaker';
import { useAppSelector,useAppDispatch } from "../../hooks/hooks"
import s from './SneakerMain.module.sass'
import { userApi } from '../../store/api/user.api'
import {setSneakers} from "../../store/reducers/SneakersSlice"

function SneakerMain() {
   const state = useAppSelector(state=>state.SneakersReducer)

   const [MessageError,setMessageError] = useState('')
   const dispatch = useAppDispatch()
                                       // и юзера получить
   const {data,isLoading,error} = userApi.useGetSneakersQuery()
   
   
   let [inputSearch, setinputSearch] = React.useState("")
   let inputChange = (event) => {
      setinputSearch(event.target.value)
   }
   useEffect(() => {
      if(error){
         setMessageError(`${error.status}: ${error.data?.detail[0].type}: ${error.data?.detail[0].msg}`)
      }else if(data?.code >= 400){
         setMessageError(`${data?.code}: ${data?.message}`)
      }else if (data?.sneakers) {
         setMessageError(data.message)
         dispatch(setSneakers(data.sneakers))
      }
  }, [data, error, dispatch]);
return (
   <div className={`${s.sneakers_wrap_main}`}>
      <div className={`${MessageError ? '' : 'vis_none'} red`}><p className={`mt10px ${s.MessageError} red`}>{MessageError}</p></div>
      <div className={`${s.sneakers_header}`}><h1>{inputSearch ? `Поиск по: ${inputSearch}` : "Все кроссовки"}</h1><div className={`${s.search}`}><img src='./img/search.svg' alt='search'></img><input placeholder='Поиск...' value={inputSearch} onChange={inputChange} /></div></div>
      <div className={`${s.sneakers_wrap}`}>{
         isLoading ?
         <h2 className={ `white ${isLoading ? "" : "vis_none"}` }>Загрузка...</h2>
         :
         state.sneakers?.filter(obj=>obj.des?.toLowerCase().includes(inputSearch.toLowerCase())).map((obj,index) => {
            return (
               <Sneaker 
               key={index}
               id={obj.id}
               des={obj.des} 
               price={obj.price} 
               img={obj.img} 
               category_id={obj.category_id}
               setMessageError={setMessageError}
               // callSetSneakers_basket={state.callSetSneakers_basket} // ??????????????????
               />
            )
         })
      }
      </div>
   </div>
)
}

export default SneakerMain;