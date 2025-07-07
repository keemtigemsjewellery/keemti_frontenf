import { useState } from "react";

import VerifyMobileOtp from "./VerifyMobileOtp";
import SendMobileOtp from "./SendMobileOtp";

interface MobilePopupModel {
  isPopupOpen: any;
}
const MobilePopup = ({ isPopupOpen }: MobilePopupModel) => {
  const [isVerifyOtpOpen, setIsVerifyOtpOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Update Phone Number</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body py-4 my-3">
          <SendMobileOtp
            isVerifyOtpOpen={isVerifyOtpOpen}
            setIsVerifyOtpOpen={setIsVerifyOtpOpen}
            setMobileNumber={setMobileNumber}
            isPopupOpen={isPopupOpen}
          />

          {isVerifyOtpOpen && (
            <VerifyMobileOtp
              mobileNumber={mobileNumber}
              isPopupOpen={isPopupOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MobilePopup;
