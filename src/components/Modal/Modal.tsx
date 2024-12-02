import React from "react";

interface IModalProps {
  text: string;
  closeModal: () => void;
  title?: string;
}

const Modal = (props: IModalProps) => {
  const { title = "Внимание!", text, closeModal } = props;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <p>{text}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
