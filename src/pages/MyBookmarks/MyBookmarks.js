import Header from "../../components/Header/Header";
import Overlay from "../../components/Overlay/Overlay";
import SneakerBookmarks from '../../components/SneakerBookmarks/SneakerBookmarks';

function MyBookmarks(p) {
  return (
    <div className="App">
      <Overlay 
      overlaySwitch={p.overlaySwitch}
      closebasket={p.closebasket} 
      sneakers_basket={p.sneakers_basket} 
      callDelSneakers_basket={p.callDelSneakers_basket}
      itemsPrice={p.itemsPrice}
      BasketOrderFunc={p.BasketOrderFunc}
      tf={p.tf}
      orderNum={p.orderNum}
      />
      <Header openbasket={p.openbasket} itemsPrice={p.itemsPrice}/>
      <SneakerBookmarks 
      sneakers_basket={p.sneakers_basket} 
      />

    </div>
  );
}

export default MyBookmarks;