import React from "react";
import "./DeleteConfirmation.css"
function DeleteConfirmation({ question, message, onConfirm, onCancel }) {
  return (
    <div className="pop-up_msg">
      <div className="pop-up_msg-content">
        <p className="question">{question}</p>
        <p dangerouslySetInnerHTML={{ __html: message }} />
        <div>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
