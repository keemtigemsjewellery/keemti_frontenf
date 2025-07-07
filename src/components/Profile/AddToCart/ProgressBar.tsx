interface ProgressBarModel {
  cartStep: any;
}

const ProgressBar = ({ cartStep }: ProgressBarModel) => {
  return (
    <div className="checkout-progress">
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button className={`nav-link ${cartStep < 4 && "active"}`}>
            <span className="number">1</span>
            <div className="title">
              <h6>In Cart</h6>
              <span>Step Description</span>
            </div>
          </button>
          <button
            className={`nav-link ${1 < cartStep && cartStep < 4 && "active"}`}
          >
            <span className="number">2</span>
            <div className="title">
              <h6>Address</h6>
              <span>Step Description</span>
            </div>
          </button>
          <button className={`nav-link ${cartStep === 3 && "active"}`}>
            <span className="number">3</span>
            <div className="title">
              <h6>Payment</h6>
              <span>Step Description</span>
            </div>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ProgressBar;
