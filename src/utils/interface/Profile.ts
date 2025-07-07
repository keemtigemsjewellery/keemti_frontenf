export interface addNewAddressModel {
  fullName: string;
  mobileNumber: string;
  pincode: string;
  locality: string;
  streetaddress: string;
  landmark: string;
  city: string;
  state: string;
  primary: boolean;
}

export type AddressData = {
  _id: string;
  userId: string;
  fullName: string;
  mobileNumber: string;
  pincode: string;
  streetaddress: string;
  locality: string;
  landmark: string;
  city: string;
  state: string;
  primary: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface profileDetailsModel {
  title: string;
  fullName: string;
  countryCode: string;
  dateOfBirth: Date;
  anniversaryDate: Date;
  spouseBirthdayDate: Date;
  mobileNo: number;
  profileImage: any;
  email: string;
}
