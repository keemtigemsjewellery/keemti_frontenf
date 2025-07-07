import { Controller } from "react-hook-form";

export interface CustomFieldModel {
  name: string;
  control: any;
  inputType: string;
  placeholder: string;
  errors?: any;
  disable?: boolean;
  textAreaRow?: number;
}

const CustomField = ({
  name,
  control,
  inputType,
  placeholder,
  errors,
  disable,
  textAreaRow,
}: CustomFieldModel) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <>
            {inputType === "textarea" ? (
              <textarea
                className="form-control bg-white h-auto"
                rows={textAreaRow}
                value={value}
                onChange={onChange}
                disabled={disable ?? false}
                placeholder={placeholder}
              />
            ) : (
              <input
                className="form-control pe-4"
                type={inputType}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                disabled={disable ?? false}
              />
            )}
            {errors && errors?.[name] && (
              <p className="text-danger text-start mt-2 mb-0">
                {errors?.[name].message as string}
              </p>
            )}
          </>
        );
      }}
    />
  );
};

export default CustomField;
