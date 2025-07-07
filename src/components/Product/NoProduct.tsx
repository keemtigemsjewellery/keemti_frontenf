import { useNavigate } from "react-router-dom";
import PageNotFoundIcon from "../../assets/images/not-found.jpg";
import { ROUTE } from "utils/api/routes/clientRoute";

const NoProduct = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center flex-column my-5 py-5">
      <div className="page-not-found">
        <img  src={PageNotFoundIcon} alt="PageNotFoundIcon" />
        <br />
        <div className="d-flex justify-content-center">
          <button
            onClick={() => navigate(ROUTE.DASHBOARD)}
            className="btn primary-btn h-auto lh-1 px-5 py-3 fw-500"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoProduct;
