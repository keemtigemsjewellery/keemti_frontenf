import { useEffect, useState } from "react";

import VerifyEmailOtp from "./VerifyEmailOtp";
import SendEmailOtp from "./SendEmailOtp";

interface EmailPopupModel {
  isPopupOpen: any;
}
const EmailPopup = ({ isPopupOpen }: EmailPopupModel) => {
  const [isVerifyOtpOpen, setIsVerifyOtpOpen] = useState(false);
  const [emailId, setEmailId] = useState("");

  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Update Email Address</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body py-4 my-3">
          <SendEmailOtp
            isVerifyOtpOpen={isVerifyOtpOpen}
            setIsVerifyOtpOpen={setIsVerifyOtpOpen}
            setEmailId={setEmailId}
            isPopupOpen={isPopupOpen}
          />

          {isVerifyOtpOpen && (
            <VerifyEmailOtp emailId={emailId} isPopupOpen={isPopupOpen} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailPopup;
