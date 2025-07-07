import StandoutLoader from "./Loader/StandoutLoader";

const standOutArray = [
  {
    icon: "fal fa-truck-moving",
    text: "Cash On Delivery",
  },
  {
    icon: "fal fa-shopping-bag",
    text: "Every Week New",
  },
  {
    icon: "far fa-undo-alt",
    text: "30 Days Money Back",
  },
  {
    icon: "fal fa-sync",
    text: "Lifetime Exchange",
  },
  {
    icon: "fal fa-diploma",
    text: "100% Certified",
  },
  {
    icon: "fas fa-alarm-snooze",
    text: "IGI Hallmark",
  },
  {
    icon: "fad fa-triangle",
    text: "BIS Hallmark",
  },
  {
    icon: "far fa-shield",
    text: "Free & Insured Delivery",
  },
];

interface StandoutModel {
  loading: boolean;
}

const Standout = ({ loading }: StandoutModel) => {
  return (
    <>
      {!loading && (
        <section className="section-space standout-sec pt-4 pt-md-3 pb-0">
          <div className="container">
            <div className="white-bg white-boxbg">
              <div className="row">
                <div className="col-sm-12">
                  <div className="head">
                    <h5>What Makes Us Standout</h5>
                  </div>
                </div>
              </div>
              <div className="row">
                {standOutArray.map((standItem, index) => (
                  <div className="col standout-col" key={index}>
                    <div className="standout-box">
                      <span className="icon">
                        <i className={standItem.icon}></i>
                      </span>
                      <p>{standItem.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      {loading && <StandoutLoader />}
    </>
  );
};

export default Standout;
