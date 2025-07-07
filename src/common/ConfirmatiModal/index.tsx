import { useRef } from "react";
import { ConfirmationTypeProp } from "./ConfirmationModal.types";

const ConfirmationModal = ({
  cancelButtonText = "Cancel",
  confirmationButtonText = "Confirm",
  modalId,
  title,
  onConfirm,
  onCancel = () => {},
}: ConfirmationTypeProp) => {
  const closeButton = useRef<HTMLButtonElement>(null);
  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex={-1}
      aria-labelledby={`${modalId.slice(1)}-label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="w-100">
              <div className="mb-4">
                <h5 className="modal-title text-center">{title}</h5>
              </div>

              <div className="form-group gap-2  d-flex justify-content-end">
                <div>
                  <button
                    ref={closeButton}
                    type="button"
                    className="secondary-btn w-100"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      closeButton.current?.click();
                      onCancel();
                    }}
                    aria-label="Close"
                  >
                    {cancelButtonText}
                  </button>
                </div>
                <div>
                  <button
                    className="primary-rounded-btn w-100"
                    onClick={() => {
                      onConfirm();
                      closeButton.current?.click();
                    }}
                  >
                    {confirmationButtonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
