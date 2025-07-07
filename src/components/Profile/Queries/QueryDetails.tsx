import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomField from "common/CustomField";
import * as Yup from "yup";
import {
  addQueryAPI,
  getAllQueriesAPI,
} from "utils/api/service/profileServices";

export const queryDetailsValidationSchema = Yup.object<any>().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

interface QueryDetailsModel {
  setQueryList: any;
  setTotalPages: any;
}
const QueryDetails = ({ setQueryList, setTotalPages }: QueryDetailsModel) => {
  const closeButton = useRef<HTMLButtonElement>(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(queryDetailsValidationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const params = {
      title: data.title,
      description: data.description,
    };

    try {
      await addQueryAPI(params);
      const listParams = {
        page: 1,
        limit: 10,
      };
      const { data } = await getAllQueriesAPI(listParams);
      setQueryList(data?.data?.docs);
      setTotalPages(data?.data?.totalPages);
      closeButton.current?.click();
      reset();
    } catch {
      console.log("Unable to add Query");
    }
  };

  return (
    <div
      className="modal fade"
      id="my-queries"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="address modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Query</h5>
            <button
              ref={closeButton}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body py-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="d-flex flex-wrap justify-content-between"
            >
              <div className="form-group mb-4 w-100">
                <label className="mb-1">Title*</label>
                <CustomField
                  name="title"
                  control={control}
                  inputType="text"
                  placeholder="Title*"
                  errors={errors}
                />
              </div>
              <div className="form-group mb-4 w-100">
                <label className="mb-1">Description*</label>
                <CustomField
                  name="description"
                  control={control}
                  inputType="textarea"
                  placeholder="Description*"
                  errors={errors}
                  textAreaRow={3}
                />
              </div>
              <button className="primary-btn w-100">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryDetails;
