import "../styles/Modal.css";

function Modal({ isOpen, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          {/* <button className="modal-close" onClick={onClose}>
            x
          </button> */}
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export { Modal };
