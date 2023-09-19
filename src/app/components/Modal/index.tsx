import { PropsWithChildren } from "react";
import "./index.css";
import { classNames } from "../../../utils/classNames";

export const Modal = ({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<{ isOpen: boolean; onClose: () => void }>) => {
  return (
    <div>
      <div
        className={classNames("modalDimmer", isOpen ? "visible" : "hidden")}
        onClick={onClose}
      />

      <div
        className={classNames("modalContent", isOpen ? "visible" : "hidden")}
      >
        {isOpen && children}
      </div>
    </div>
  );
};
