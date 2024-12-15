import React from 'react';
import { useTranslation } from 'react-i18next';
import { CiLocationOn } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from 'src/apis';
import RoshoonLogo from 'src/assets/images/roshoon.png';
import { loginPath, registerPath, becomeAChefPath } from 'src/paths';
import { getCurrentUser } from 'src/slices';
import { Constant } from 'src/utils/constant.js';
import {
  notifyError,
  notifySuccess,
} from 'src/components/SnackbarProvider/useSnackbar';

const AppBar = () => {
  const { t } = useTranslation();
  const currentUser = useSelector(getCurrentUser);
  const [userLogout, { isLoading }] = useLogoutMutation();
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
        <div className="flex items-center flex-start">
          <Link to="/" className="flex items-center">
            <img
              src={RoshoonLogo}
              alt="Roshoon Logo"
              className="h-auto w-[150px]"
            />
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 p-2">
            <button className="text-gray-700 text-xl">
              <CiLocationOn />
            </button>
            <Link to="#" className="text-gray-700 font-lato font-medium">
              {t('common.locateMe')}
            </Link>
          </div>

          {!currentUser?.roles?.includes(Constant.CHEF) && (
            <Link
              to={becomeAChefPath}
              className="text-gray-700 font-lato font-medium p-2"
            >
              {t('common.becomeAChef')}
            </Link>
          )}

          {currentUser?.loggedIn ? (
            <button
              className="text-gray-700 font-lato font-medium p-2"
              onClick={handleLogout}
            >
              {t('common.logOut')}
            </button>
          ) : isLoading ? (
            <div className="flex items-center">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Link
                to={registerPath}
                className="text-gray-700 font-lato font-medium p-2"
              >
                {t('common.signUp')}
              </Link>
              <Link
                to={loginPath}
                className="text-gray-700 font-lato font-medium p-2"
              >
                {t('common.logIn')}
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default AppBar;
