import QueryList from "./QueryList";
import QueryDetails from "./QueryDetails";
import { useState } from "react";

const Queries = () => {
  const [queryList, setQueryList] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <>
      <div className="col-md-12 col-lg-8 col-xl-9">
        <div className="accountpage-right white-bg white-boxbg">
          <div className="d-flex align-items-end head-btn justify-content-between">
            <div className="head withbreadcrumb">
              <h3>My Queries</h3>
            </div>
            <div className="">
              <div
                className="btn rounded-pill"
                data-bs-toggle="modal"
                data-bs-target="#my-queries"
              >
                <i className="fal fa-plus me-2"></i> Add Query
              </div>
            </div>
          </div>

          <QueryList
            queryList={queryList}
            setQueryList={setQueryList}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
          />
        </div>
      </div>
      <QueryDetails setQueryList={setQueryList} setTotalPages={setTotalPages} />
    </>
  );
};

export default Queries;
