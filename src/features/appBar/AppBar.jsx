import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CiLocationOn } from 'react-icons/ci';
import { FaCartShopping } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  useLogoutMutation,
  useSwitchRoleMutation,
  useUserProfileQuery,
} from 'src/apis';
import RoshoonLogo from 'src/assets/images/roshoon.png';
import Search from 'src/components/Search';
import {
  notifyError,
  notifySuccess,
} from 'src/components/SnackbarProvider/useSnackbar';
import { loginPath, registerPath } from 'src/paths';
import { getCurrentUser } from 'src/slices';
import { Constant } from 'src/utils/constant.js';
import { LocalStorageService } from 'src/utils/LocalStorage';
import LocateMe from './LocateMe';
import SwitchRole from './SwitchRole';

const AppBar = () => {
  const { t } = useTranslation();
  const currentUser = useSelector(getCurrentUser);
  const [openLocateMeModal, setOpenLocateMeModal] = useState(false);
  const [userLogout, { isLoading }] = useLogoutMutation();
  const [switchRole] = useSwitchRoleMutation();
  const currentZipCode = LocalStorageService.get('roshoonZipCode');
  const { data, refetch } = useUserProfileQuery();
  const userInfo = data?.user;
  const [isSellerMode, setIsSellerMode] = useState(false);
  const [isSwitchingRole, setIsSwitchingRole] = useState();

  // Initialize role based on defaultView
  useEffect(() => {
    if (currentUser?.loggedIn) {
      if (userInfo?.defaultView === Constant.CHEF) {
        setIsSellerMode(true);
      } else if (userInfo?.defaultView === Constant.BUYER) {
        setIsSellerMode(false);
      }
    }
  }, [userInfo]);

  // Refetch user profile after successful login
  useEffect(() => {
    if (currentUser?.loggedIn) {
      refetch();
    }
  }, [currentUser?.loggedIn, refetch]);

  // Handle role switching
  const handleSwitchRole = async (role) => {
    // --Prevent multiple clicks
    if (isSwitchingRole) return;
    setIsSwitchingRole(true);
    try {
      const response = await switchRole().unwrap();
      const successMessage =
        response?.message || t('notifyMessage.roleSwitched', { role });
      notifySuccess(successMessage);
      setIsSellerMode(role === 'seller');
    } catch (error) {
      const errorMessage =
        error?.data?.message ||
        t('notifyMessage.errorSwitchingRole', { error: error.message });
      notifyError(errorMessage);
    } finally {
      setIsSwitchingRole(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const status = await userLogout().unwrap();
      notifySuccess(status.message);
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <header className="w-full z-max shadow-sm fixed top-0 left-0 bg-white">
      <nav className="container mx-auto flex justify-between items-center pr-4 h-[80px]">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={RoshoonLogo}
              alt="Roshoon Logo"
              className="h-auto w-[150px]"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!isSellerMode && currentUser?.loggedIn && <Search />}

          {!currentUser?.roles?.includes(Constant.CHEF) && (
            <div
              onClick={() => setOpenLocateMeModal(!openLocateMeModal)}
              className="flex items-center gap-2 p-2 cursor-pointer"
            >
              <CiLocationOn className="text-text-darkGray text-xl" />
              <span className="text-text-darkGray font-medium">
                {currentZipCode
                  ? `${t('common.updateLocateMe')} ${currentZipCode}`
                  : t('common.locateMe')}
              </span>
            </div>
          )}

          {currentUser?.loggedIn && (
            <SwitchRole
              isSellerMode={isSellerMode}
              isSwitchingRole={isSwitchingRole}
              handleSwitchRole={handleSwitchRole}
              userInfo={userInfo}
            />
          )}

          {!isSellerMode && currentUser?.loggedIn && (
            <Link to="#" className="flex items-center gap-2 mr-2">
              <div className="relative inline-flex items-center">
                <FaCartShopping className="text-3xl text-text-midGray" />
                <span className="absolute -top-3 -left-2 bg-greenPrimary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                  3
                </span>
              </div>
              <span className="text-text-darkGray font-medium">
                {t('common.cart')}
              </span>
            </Link>
          )}

          <div className="flex items-center gap-4">
            {currentUser?.loggedIn ? (
              <div className="flex items-center gap-4">
                <button
                  className="text-text-darkGray font-medium border px-4 h-[47px]"
                  onClick={handleLogout}
                >
                  {t('common.logOut')}
                </button>
                <Link to="">
                  {userInfo?.img ? (
                    <img
                      src={userInfo?.img}
                      alt={`${userInfo?.firstName} ${userInfo?.lastName}`}
                    />
                  ) : (
                    <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center text-text-footerMention text-lg font-medium">
                      {userInfo?.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </Link>
              </div>
            ) : isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
            ) : (
              <>
                <Link
                  to={registerPath}
                  className="text-text-darkGray font-medium"
                >
                  {t('common.signUp')}
                </Link>
                <Link to={loginPath} className="text-text-darkGray font-medium">
                  {t('common.logIn')}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {openLocateMeModal && (
        <LocateMe
          isShowing={openLocateMeModal}
          setIsShowing={setOpenLocateMeModal}
        />
      )}
    </header>
  );
};

export default AppBar;
