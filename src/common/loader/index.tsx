import spinnerImage from "../../assets/images/spinner.svg";

const Loader = () => {
  return (
    <div className="custom-spinner-loader-page">
      <img src={spinnerImage} alt="spinner" />
    </div>
  );
};

export default Loader;
