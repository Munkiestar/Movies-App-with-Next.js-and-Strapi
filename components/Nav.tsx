import Link from "next/link";
import { useState } from "react";
import { fetcher } from "../lib/api";
import { setToken, unsetToken } from "../lib/auth";
import { useUser } from "../lib/authContext";

function Nav() {
  type StateData = {
    identifier: string;
    password: string;
  };

  const [data, setData] = useState<StateData>({
    identifier: "",
    password: "",
  });

  // Context
  const { user, loading } = useUser();

  // handle change
  const handleChange = (e: { target: { name: string; value: string } }) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const resData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: data.identifier,
          password: data.password,
        }),
      }
    );

    console.log("resData", resData);
    setToken(resData);
  };

  const logout = () => {
    unsetToken();
  };

  return (
    <nav
      className=" flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-lg text-gray-700
          bg-white"
    >
      <div>
        <Link href="/" passHref legacyBehavior>
          <a>
            <img
              className="m-3"
              src="/strapi-logo.png"
              width={200}
              height={50}
              alt="Strapi Logo"
            />
          </a>
        </Link>
      </div>
      <div
        className="hidden w-full md:flex md:items-center md:w-auto"
        id="menu"
      >
        <ul
          className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between
              md:pt-0 space-x-2"
        >
          <li>
            <Link href="/" legacyBehavior>
              <a className="md:p-2 py-2 block hover:text-purple-400">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/films" legacyBehavior>
              <a className="md:p-2 py-2 block hover:text-purple-400" href="#">
                Films
              </a>
            </Link>
          </li>
          {!loading && user ? (
            <li>
              <Link href="/profile" legacyBehavior>
                <a className="md:p-2 py-2 block hover:text-purple-400">
                  Profile
                </a>
              </Link>
            </li>
          ) : (
            ""
          )}
          {!loading && user ? (
            <li>
              <a
                onClick={logout}
                className="md:p-2 py-2 block hover:text-purple-400 cursor-pointer"
              >
                Logout
              </a>
            </li>
          ) : (
            ""
          )}
          {!loading && !user ? (
            <>
              <li>
                <form className="form-inline" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="identifier"
                    className="md:p-2 form-input py-2 rounder mx-2"
                    onChange={handleChange}
                    placeholder="Username"
                    value={data.identifier}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    className="md:p-2 form-input py-2 rounder mx-2"
                    onChange={handleChange}
                    placeholder="Password"
                    value={data.password}
                    required
                  />
                  <button
                    className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                    type="submit"
                  >
                    Login
                  </button>
                </form>
              </li>
              <li>
                <Link href="/register" legacyBehavior>
                  <a className="md:p-2 block py-2 hover:text-purple-200 text-black">
                    Register
                  </a>
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
