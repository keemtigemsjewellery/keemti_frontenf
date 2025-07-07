import ProfileSidebar from "./ProfileSidebar";
import { useLocation } from "react-router-dom";
import { PROFILE_ROUTE } from "utils/api/routes/clientRoute";

import UserDetails from "./UserDetails";
import ProfileOrder from "./MyOrder/ProfileOrder";
import ProfileWishlist from "./Wishlist/ProfileWishlist";
import ProfileAddress from "./Address";
import Queries from "./Queries";

const Profile = () => {
  const { pathname } = useLocation();

  return (
    <div className="inner-page graybg">
      <section className="section-space accountpage-sec pt-4 pt-md-3">
        <div className="container">
          <div className="row">
            <ProfileSidebar />

            {pathname === PROFILE_ROUTE.PROFILE && <UserDetails />}
            {pathname === PROFILE_ROUTE.PROFILE_ORDER && <ProfileOrder />}
            {pathname === PROFILE_ROUTE.PROFILE_WHISHLIST && (
              <ProfileWishlist />
            )}
            {pathname === PROFILE_ROUTE.PROFILE_ADDRESS && <ProfileAddress />}
            {pathname === PROFILE_ROUTE.PROFILE_MY_QUERIES && <Queries />}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
