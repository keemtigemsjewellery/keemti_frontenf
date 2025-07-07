import PageNotFoundIcon from "../../assets/images/404.jpg";

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center my-5 py-5">
      <div className="page-not-found">
        <img  src={PageNotFoundIcon} alt="PageNotFoundIcon" />
      </div>
    </div>
  );
};

export default PageNotFound;
