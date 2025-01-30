import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";

export default function DefaultLayout() {
  return (
    <>
      <Header></Header>

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
}
