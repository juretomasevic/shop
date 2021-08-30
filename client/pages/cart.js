import { DeleteOutlined } from "@ant-design/icons";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
const Cart = () => {
  const { state, dispatch } = useContext(Context);
  const { cart } = state;
  const { user } = state;

  let sum = 0;

  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);
  const handleOrder = async (e) => {
    {
      e.preventDefault();

      try {
        await axios.post(`/api/cart`, {
          user,
          cart,
          sum,
        });

        toast("Order successful!");
      } catch (err) {
        toast(err.response.data);
      }
    }
  };

  return (
    <>
      <div className="container mt-5 ">
        <div className="header d-flex flex-row  justify-content-around">
          <p>Product</p>
          <p>Price(HRK)</p>
        </div>

        {cart.map((product) => (
          <div className="row">
            <div className="d-inline-flex mt-3 itemInfo d-flex justify-content-around">
              <div className="container ">
                <DeleteOutlined
                  className="mt-4 delete"
                  onClick={() =>
                    dispatch({
                      type: "CART_REMOVE",
                      payload: product.id,
                    })
                  }
                />
                <img className="product-image " src={product.image}></img>
                <span>{product.name}</span>
              </div>
              <div className="cijena mt-5">{product.price}</div>
            </div>
          </div>
        ))}

        <div className="header my-3" />

        {cart.map((product) => ((sum = sum + product.price), console.log(sum)))}
        <div className=" suma">{sum} HRK</div>
        <button
          type="submit"
          className="btn btn-primary offset-md-10"
          onClick={handleOrder}
        >
          Purchase Order
        </button>
      </div>
    </>
  );
};
export default Cart;
