import DrawerCmp from "./DrawerCmp";
import logo from "/assets/logo.svg";
import edit from "/assets/edit.svg";
import save from "/assets/save.svg";
import deleteIcon from "/assets/delete.svg";
// import rotate from "/assets/rotate.svg";
// import stop from "/assets/stop.svg";
import { Vector3 } from "three";
import { FC } from "react";

type HotspotProps = {
  position: Vector3;
  label: string;
};

type HeaderProps = {
  hotspots: HotspotProps[];
  onDeleteHotspot: (idx: number) => void;
  onEditLabelClick: (idx: number) => void;
  onSaveLabelClick: () => void;
  newLabel: string;
  editLabelIdx: number | null;
  setNewLabel: (label: string) => void;
  // toggleAnimation: () => void;
  // animate: boolean;
};

const Header: FC<HeaderProps> = ({
  hotspots,
  onDeleteHotspot,
  editLabelIdx,
  onEditLabelClick,
  onSaveLabelClick,
  newLabel,
  setNewLabel,
  // toggleAnimation,
  // animate,
}) => {
  return (
    <div className="w-full flex flex-row">
      <div className="w-full py-6">
        <img src={logo} alt="logo" className="w-1/2 md:w-1/4" />
      </div>
      <DrawerCmp
        drawercontent={
          <div className="w-full flex flex-col">
            <div className="border-t-2 mt-4">
              <div className="pt-3">
                <p>Hotspots</p>
                <div className="flex flex-col gap-4 mt-2">
                  {hotspots.map((h, idx) => (
                    <div key={idx}>
                      <div className="w-1/2 flex flex-row gap-4 border py-3 px-4 rounded-xl">
                        <p>{h.label}</p>
                        {editLabelIdx === idx ? (
                          <button onClick={onSaveLabelClick}>
                            <img src={save} alt="save" className="w-5 border" />
                          </button>
                        ) : (
                          <button onClick={() => onEditLabelClick(idx)}>
                            <img src={edit} alt="edit" className="w-5 border" />
                          </button>
                        )}
                        <button onClick={() => onDeleteHotspot(idx)}>
                          <img
                            src={deleteIcon}
                            alt="delete"
                            className="w-5 border"
                          />
                        </button>
                      </div>
                      {editLabelIdx === idx && (
                        <input
                          type="text"
                          value={newLabel}
                          onChange={(e) => setNewLabel(e.target.value)}
                          className="border mt-2"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* <div>
                <button
                  onClick={toggleAnimation}
                  className="flex flex-row items-center gap-2 py-2 justify-center rounded-xl w-2/5 border"
                >
                  <span>animate</span>
                  <img
                    src={animate ? stop : rotate}
                    alt="rotate"
                    className="w-5 border"
                  />
                </button>
              </div> */}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Header;
