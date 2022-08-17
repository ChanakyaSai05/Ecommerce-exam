import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, set_proData } from "../features/productSlice";
import { set_data } from "../features/userSlice";
export default function CardMap({ item, index }) {
  const dispatch = useDispatch();
  const pro_data = useSelector(selectProduct);
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  //
  const addBtn = () => {
    if (item.state) {
      return;
    } else {
      // let pro_data = data?.products;
      let updated_proData = pro_data.map((i) =>
        i.product_title === item.product_title ? { ...i, state: true } : i
      );
      dispatch(set_proData(updated_proData));
      // setProducts((cate) =>
      //   cate.map((i) =>
      //     i.product_title === item.product_title ? { ...i, state: true } : i
      //   )
      // );
      dispatch(set_data(item));
    }
  };
  // console.log(products);
  return (
    <Card style={{ width: "18rem", margin: "1vw" }}>
      <Card.Img variant="top" src={item.p_image} height="230vh" />
      <Card.Body style={{ marginTop: "-7%" }}>
        <div
          style={{
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "4px",
          }}
        >
          <Button
            style={{ backgroundColor: "#f47d2f", border: "none" }}
            onClick={addBtn}
          >
            {!item.state ? <>Add to Cart</> : <>Added to Cart</>}
          </Button>
        </div>
        <Card.Title className="text-center">
          {item.product_title.slice(0, 15)}
        </Card.Title>
        <Card.Text
          style={{ color: "#f47d2f", fontWeight: "bold", textAlign: "center" }}
        >
          ₹{numberWithCommas(item.list_price)}.00
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
