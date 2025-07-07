import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export const SuccessSweetAlert = (args: any) => {
  Swal.fire({
    position: "center",
    iconColor: "#A02B68",
    icon: "success",
    title: args.title,
    showConfirmButton: false,
    color: "#A02B68",
    timer: args.timer,
  });
};

export const ErrorSweetAlert = (args: any) => {
  Swal.fire({
    icon: "error",
    iconColor: "#A02B68",
    title: args.title,
    color: "#A02B68",
    showConfirmButton: false,
    timer: args.timer,
  });
};

export const SuccessWithButtonSweetAlert = (args: any) => {
  Swal.fire({
    position: "center",
    iconColor: "#A02B68",
    icon: "success",
    title: args.title,
    showConfirmButton: true,
    confirmButtonText: "Done",
    confirmButtonColor: "#A02B68",
    focusConfirm: false,
    color: "#A02B68",
    timer: args.timer,
  });
};

export const WarningSweetAlert = (args: any) => {
  Swal.fire({
    icon: "warning",
    iconColor: "#A02B68",
    title: args.title,
    color: "#A02B68",
    showConfirmButton: false,
    timer: args.timer,
  });
};
