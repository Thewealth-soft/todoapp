
import React from "react";

function ConfirmationDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="pop-up_msg">
      <div className="pop-up_msg-content">
        <p>{message}</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
