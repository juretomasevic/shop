import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item } = Menu;
const TopNav = () => {
  const [current, setCurrent] = useState("");
  const { state, dispatch } = useContext(Context);
  const { user, cart } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
    //
  };

  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreOutlined />}
      >
        <Link href="/">
          <a>App</a>
        </Link>
      </Item>
      {user === null && (
        <>
          <Item
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Item>
          <Item
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
          >
            <Link key="register" href="/register">
              <a>Register</a>
            </Link>
          </Item>
        </>
      )}
      {user !== null && (
        <>
          <Item
            icon={<ShopOutlined />}
            key="/shop"
            onClick={(e) => setCurrent(e.key)}
            href="/shop"
          >
            <Link href="/shop">
              <a>Shop</a>
            </Link>
          </Item>

          <Item
            icon={<ShoppingCartOutlined />}
            key="/cart"
            onClick={(e) => setCurrent(e.key)}
            href="/cart"
          >
            <Link href="/cart">
              <a>Cart</a>
            </Link>
            <span id="cartNumber">{cart.length}</span>
          </Item>

          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </>
      )}
    </Menu>
  );
};
export default TopNav;
