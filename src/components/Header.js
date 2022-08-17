import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { set_searchData } from "../features/searchSlice";
function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(set_searchData(e.target.value));
  };
  // console.log(user);
  // const navigate = useNavigate();
  //this is correct
  // onClick={()=>navigate("/")}
  //but we cant write ()=>useNavigate("/");//error
  // React Hook "useNavigate" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function
  return (
    <div>
      <div className="d-flex m-2 justify-content-between mx-4 align-items-center">
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          <h4 className="fw-bold">My Store</h4>
        </Link>
        {/* <h4 className="fw-bold" onClick={() => navigate("/")}>
            My Store
          </h4> */}
        <button
          type="button"
          class="btn btn-transparent position-relative"
          style={{ marginTop: "12px" }}
        >
          <Link to="/cart" style={{ color: "black" }}>
            <ShoppingCartIcon style={{ marginTop: "-50%" }} />
          </Link>

          {user.length !== 0 && (
            <span class="position-absolute top-0 start-85 translate-middle badge rounded-pill bg-warning">
              {user.length}
            </span>
          )}
        </button>
      </div>
      <div className="header-bottom d-flex align-items-center">
        <div className="mx-3 ">
          <input
            style={{
              width: "45.5vw",
              borderRadius: "4px",
              border: "none",
              outline: "none",
              height: "4.52vh",
              paddingBottom: "4px",
            }}
            placeholder="  Search By Brand or Title"
            onChange={handleChange}
          />
        </div>
        <div
          style={{
            backgroundColor: "#ea8a1d",
            padding: "3px 5px",
            marginLeft: "-1.7%",
          }}
        >
          <SearchIcon style={{ color: "white" }} />
        </div>
      </div>
    </div>
  );
}

export default Header;
