import { ToastContainer } from "react-toastify";
import AddPropertyUI from "../website/ui/common/AddPropertyUI";

function UpdateProperty() {
  return (
    <>
      <ToastContainer />
      <AddPropertyUI admin={true} />
    </>
  );
}

export default UpdateProperty;
