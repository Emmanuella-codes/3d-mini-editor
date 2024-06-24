import DrawerCmp from "./DrawerCmp";
import logo from "/assets/logo.svg";
import deleteIcon from "/assets/delete.svg"

const Header = () => {
  return (
    <div className="w-full flex flex-row">
      <div className="w-full py-6">
        <img src={logo} alt="logo" className="w-1/2 md:w-1/4" />
      </div>
      <DrawerCmp
        drawercontent={
          <div className="w-full flex flex-col">
            <button className="w-1/2 flex flex-row items-center justify-between py-1 px-2 rounded-md border">
              <span>Delete</span>
              <span>
                <img src={deleteIcon} alt="delete" className="w-5" />
              </span>
            </button>
            <div className="border-b-2 mt-4">

            </div>
          </div>
        }
      />
    </div>
  );
};

export default Header;
