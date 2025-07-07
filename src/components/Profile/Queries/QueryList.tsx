import { useEffect, useState } from "react";
import CustomPagination from "components/Common/CustomPagination";
import { getAllQueriesAPI } from "utils/api/service/profileServices";
import { orderDetailsDateConverter } from "utils/helper/helper";

interface QueryListModel {
  queryList: any;
  setQueryList: any;
  totalPages: any;
  setTotalPages: any;
}
const QueryList = ({
  queryList,
  setQueryList,
  totalPages,
  setTotalPages,
}: QueryListModel) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const queryListAPIHandler = async () => {
      const params = {
        page: currentPage,
        limit: 10,
      };
      const { data } = await getAllQueriesAPI(params);
      setQueryList(data?.data?.docs);
      setTotalPages(data?.data?.totalPages);
    };
    queryListAPIHandler();
  }, [currentPage]);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      {queryList && queryList.length > 0 && (
        <>
          <hr className="mb-4" />
          <div className="address-wrap">
            <div className="d-flex align-items-center flex-column mb-4">
              {queryList?.map((queryValue: any) => (
                <div
                  className="address-box d-flex flex-wrap justify-content-between w-100 mb-3"
                  key={queryValue._id}
                >
                  <div className="address-left queryList width-lg-100">
                    <h4>{queryValue?.title ?? ""}</h4>
                    <p>{queryValue?.description ?? ""}</p>
                    {queryValue?.comment && (
                      <div className="comment-parent">
                        <span className="comment">Admin reply: </span>
                        <span>{queryValue?.comment ?? ""}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 mt-lg-0">
                    <p className="m-0 fw-bold">
                      {orderDetailsDateConverter(queryValue?.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center mt-0 mb-3 mb-lg-0 mt-lg-3">
                  <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </ul>
              </nav>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default QueryList;
