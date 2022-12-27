
function SneakerBasket(p) {
  let remove_sneaker =()=>{
    console.log("sneaker remove")
  }
return (
    <div className='sneaker-basket'>
      <img src={p.img} alt='sneaker'></img> 
      <div className='des-basket'><p>{p.des}</p><h3>{p.price}</h3></div>
      <button onClick={remove_sneaker}></button>
    </div>
  );
}

export default SneakerBasket;
