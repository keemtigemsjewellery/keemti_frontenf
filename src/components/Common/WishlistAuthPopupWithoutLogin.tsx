import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTE } from "utils/api/routes/clientRoute";
import EmptyBagIcon from "../../assets/images/EmptyBag.svg";

const WishlistAuthPopupWithoutLogin = () => {
  const navigate = useNavigate();
  const closeButton = useRef<HTMLButtonElement>(null);

  return (
    <div
      className="modal fade"
      id="auth-login-wishlist"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="address modal-content">
          <div className="modal-header border-none">
            <button
              ref={closeButton}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body pt-2 pb-4 px-4 mb-2 d-flex justify-content-center align-items-center flex-column">
            <img  src={EmptyBagIcon} alt="empty" />
            <h3 className="pt-3">Your wishlist is empty!</h3>

            <p className="mt-2 mb-2 mb-sm-1 color-grey text-center">
              When your outfit is perfect, your jewellery should be too!
            </p>
            <p className="mb-4 color-grey text-center">
              Add on trendy designs to your wishlist to watch your outfit
            </p>

            <button
              onClick={() => {
                navigate(AUTH_ROUTE.LOGIN);
                closeButton.current?.click();
              }}
              className="btn primary-btn h-auto lh-1 px-5 py-3 fw-500"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistAuthPopupWithoutLogin;
