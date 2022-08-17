import React, { useEffect, useState } from "react";
import data from "../data/data.json";
import CardMap from "./CardMap";
import "./Cards.css";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, set_proData } from "../features/productSlice";
import { selectSearch } from "../features/searchSlice";
function Cards() {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const search = useSelector(selectSearch);
  useEffect(() => {
    if (product.length === 0) {
      let pro_data = data?.products;
      let updated_proData = pro_data.map((item) => {
        return { ...item, quantity: 1, state: false };
      });
      dispatch(set_proData(updated_proData));
    }
  }, []);

  return (
    <div className="card-container">
      {product
        ?.filter((item) =>
          item.product_title.toLowerCase().includes(search.toLowerCase())
        )
        ?.map((item, index) => {
          return (
            <CardMap
              item={item}
              index={index}
              key={index}
              // products={products}
              // setProducts={setProducts}
            />
          );
        })}
    </div>
  );
}

export default Cards;
