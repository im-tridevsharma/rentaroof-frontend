import { ToastContainer } from "react-toastify";
import AddPropertyUI from "../../../components/website/ui/common/AddPropertyUI";

function Add() {
  return (
    <>
      <ToastContainer />
      <AddPropertyUI admin={true} />
    </>
  );
}

export default Add;
