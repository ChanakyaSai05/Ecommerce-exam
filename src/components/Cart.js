import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import {
  selectUser,
  inc_quantity,
  dec_quantity,
  remove_data,
  empty_data,
} from "../features/userSlice";
import { selectProduct, set_proData } from "../features/productSlice";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { selectSearch } from "../features/searchSlice";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import coupon from "../data/coupon.json";
function Cart() {
  const user = useSelector(selectUser);
  const products = useSelector(selectProduct);
  const search = useSelector(selectSearch);
  const [price, setPrice] = useState(0);
  const [coupons, setCoupons] = useState("");
  const [flag, setFlag] = useState(false);
  // console.log(coupon);
  const handleChange = (event) => {
    setCoupons(event.target.value);
  };
  // console.log(coupons);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const incrementBtn = (pro) => {
    // console.log(pro);
    if (pro.quantity === parseInt(pro.stock)) {
      alert("Out of stock");
      return;
    } else {
      let base_product = products.filter((item) => item.id === pro.id);
      let details = {
        pro_id: pro.id,
        base_price: base_product[0].list_price,
      };
      // console.log(base_product, details, pro_id);
      dispatch(inc_quantity(details));
    }
  };
  const decrementBtn = (pro, index) => {
    if (pro.quantity === 1) {
      let state1 = products.map((item) => {
        if (item.id === pro.id) {
          return { ...item, state: false };
        } else {
          return item;
        }
      });
      dispatch(set_proData(state1));
      dispatch(remove_data(index));
    } else {
      let base_product = products.filter((item) => item.id === pro.id);
      let details = {
        pro_id: pro.id,
        base_price: base_product[0].list_price,
      };
      dispatch(dec_quantity(details));
    }
    // console.log(base_product, details, pro_id);
  };
  const removeBtn = (pro, index) => {
    let state1 = products.map((item) => {
      if (item.id === pro.id) {
        return { ...item, state: false };
      } else {
        return item;
      }
    });
    dispatch(set_proData(state1));
    dispatch(remove_data(index));
  };
  const emptyCartBtn = () => {
    dispatch(empty_data());
    let state1 = products.map((item) => {
      return { ...item, state: false };
    });
    dispatch(set_proData(state1));
    navigate("/");
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const discountFn = (pro) => {
    let price = pro.list_price;
    let discount = pro.discount;
    let parsed = parseInt(discount.slice(0, discount.length - 1));
    let result = price - (parsed / 100) * price;
    return result;
  };
  const couponApplyBtn = () => {
    if (price === 0) {
      return;
    }
    if (coupons === "") {
      setFlag(false);
      calculate();
    } else {
      if (flag) {
        return;
      } else {
        let couponApplied = coupons;
        let couponItem = coupon?.coupons?.filter(
          (item) => item.code === couponApplied
        );
        // console.log(couponItem[0]);
        let cartPrice = price;
        if (cartPrice >= couponItem[0].minimum_value) {
          let price = cartPrice;
          let discount = couponItem[0].discount;
          let parsed = parseInt(discount);
          let result = price - (parsed / 100) * price;
          setPrice(result);
          setFlag(true);
        } else {
          alert("failed");
          setFlag(false);
        }
      }
    }

    // console.log(CouponItem);
  };
  function calculate() {
    if (user.length === 0) {
      setPrice(0);
    }
    if (user.length > 0) {
      let prices = user.map((item) => {
        if (item.discount.length > 0) {
          let price = item.list_price;
          let discount = item.discount;
          let parsed = parseInt(discount.slice(0, discount.length - 1));
          let result = price - (parsed / 100) * price;
          return result;
        } else {
          return item.list_price;
        }
      });
      let resultprice = prices.reduce((a, b) => a + b);
      setPrice(resultprice);
      // console.log(prices);
    }
  }
  useEffect(() => {
    calculate();
  }, [user]);
  return (
    <div className="cart-container">
      <div className="first-child-cart">
        <div className="first-child-cartHead">
          <div style={{ fontWeight: "bolder", fontSize: "27px" }}>
            My Cart({user.length})
          </div>
          <div style={{ fontWeight: "bold", paddingTop: "7px" }}>
            Deliver to
            <span style={{ marginLeft: "2px" }}>
              <input
                type="number"
                placeholder="Enter delivery pincode"
                style={{
                  borderTop: "0px",
                  borderLeft: "0px",
                  borderRight: "0px",
                  outline: "0",
                }}
              />
            </span>
            <span>
              <Button
                style={{ backgroundColor: "orangered", marginLeft: "2px" }}
              >
                Check
              </Button>
            </span>
          </div>
        </div>
        <div>
          <hr />
          {user
            ?.filter((item) =>
              item.product_title.toLowerCase().includes(search.toLowerCase())
            )
            ?.map((product, index) => (
              <div key={product.id} className="cart-box">
                <div className="first-child1">
                  <img
                    src={product.p_image}
                    alt="productImage"
                    width="350"
                    height="280"
                    // style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="second-child1">
                  <div style={{ fontWeight: "bold" }}>
                    {product.product_title.toUpperCase()}
                  </div>
                  {product.discount.length > 0 ? (
                    <div
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          color: "#f48135",
                          fontSize: "24px",
                          marginRight: "7px",
                        }}
                      >
                        ₹ {discountFn(product)}
                      </span>
                      <span
                        className="text-muted"
                        style={{
                          textDecoration: "line-through",
                          marginRight: "7px",
                        }}
                      >
                        ₹ {numberWithCommas(product.list_price)}.00
                      </span>
                      <span style={{ color: "green", fontSize: "18px" }}>
                        {product.discount} off
                      </span>
                    </div>
                  ) : (
                    <div style={{ fontWeight: "bold" }}>
                      <span style={{ color: "#f48135", fontSize: "24px" }}>
                        ₹ {numberWithCommas(product.list_price)}.00
                      </span>
                    </div>
                  )}
                  <div>
                    <b className="text-muted">Brand:</b>
                    {product.brand}
                  </div>
                  <div>
                    <b className="text-muted">Availability:</b>
                    {product.quantity > product.stock ? (
                      <span style={{ color: "red" }}>Out of stock</span>
                    ) : (
                      <span style={{ color: "forestgreen" }}>In stock</span>
                    )}
                  </div>
                  <Button
                    color="warning"
                    onClick={() => removeBtn(product, index)}
                  >
                    Remove from cart
                  </Button>
                  <hr />
                  <div style={{ margin: "-2% 0%" }}>
                    <button
                      style={{
                        width: "1.8vw",
                        backgroundColor: "#ebebeb",
                        color: "black",
                        border: "none",
                        borderRadius: "100%",
                        textAlign: "center",
                        height: "1.8vw",
                      }}
                      onClick={() => decrementBtn(product, index)}
                    >
                      -
                    </button>
                    <span
                      style={{
                        margin: "0% 2%",
                        border: "1px solid #ebebeb",
                        padding: "1px 10px",
                      }}
                    >
                      {product.quantity}
                    </span>

                    <button
                      style={{
                        width: "1.8vw",
                        backgroundColor: "#ebebeb",
                        color: "black",
                        border: "none",
                        borderRadius: "100%",
                        textAlign: "center",
                        height: "1.8vw",
                      }}
                      onClick={() => incrementBtn(product)}
                    >
                      +
                    </button>
                  </div>
                  <hr />
                </div>
              </div>
            ))}
          <hr />
        </div>
      </div>
      <div className="second-child-cart">
        <div>
          <div className="second-child-cartHeader">PRICE DETAILS </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Price({user.length} items)</div>
            <div>{price}</div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Delivery Charges</div>
              <div>FREE</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Packing Charges</div>
            <div>₹40</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "2%",
            }}
          >
            <div>
              <div>
                <FormControl
                  sx={{ minWidth: 120 }}
                  style={{ marginBottom: "-2%", marginTop: "2%" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small">Coupons</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    // value={coupons}
                    value={coupons}
                    label="Coupons"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {coupon?.coupons.map((item, index) => (
                      <MenuItem value={item.code}>{item.code}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            <div>
              <Button
                style={{ backgroundColor: "orangered", border: "none" }}
                onClick={couponApplyBtn}
              >
                Apply
              </Button>
            </div>
          </div>
          <hr />
          <div className="second-child-cartFooter">
            <div>Total Amount</div>
            {user.length > 0 ? <div>₹ {price + 40}</div> : <div>0</div>}
          </div>
          <hr />
        </div>
        <div>
          {user.length === 0 ? (
            ""
          ) : (
            <div className="cart-footer">
              <div>
                <Button color="warning" onClick={emptyCartBtn}>
                  Empty cart
                </Button>
              </div>
              <div>
                <Button
                  style={{ backgroundColor: "orangered", border: "none" }}
                >
                  Place Order
                </Button>
              </div>
            </div>
          )}
        </div>
        <hr />
        <div>
          <div
            style={{ fontWeight: "bolder", fontSize: "25px", marginTop: "4px" }}
          >
            COUPONS
          </div>
          <div>
            {coupon?.coupons?.map((item) => (
              <div style={{ margin: "4px 0px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>
                    <b className="text-muted">Code:</b>
                    {item.code}
                  </span>
                  <span>
                    <b className="text-muted">Discount:</b>
                    {item.discount}%
                  </span>
                </div>
                <div>
                  <span>
                    <b className="text-muted">Min Cart_Value:</b> ₹
                    {numberWithCommas(item.minimum_value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
