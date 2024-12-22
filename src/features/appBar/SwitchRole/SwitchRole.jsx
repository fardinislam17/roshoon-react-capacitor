import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegUser } from 'react-icons/fa';
import { MdStorefront } from 'react-icons/md';
import { Constant } from 'src/utils/constant';

const SwitchRole = ({
  isSellerMode,
  isSwitchingRole,
  handleSwitchRole,
  userInfo,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-4">
      {/* Customer Button */}
      <button
        className={`flex items-center gap-[10px] font-medium px-4 h-12 transition-all ${
          !isSellerMode && userInfo?.defaultView === Constant.BUYER
            ? 'bg-greenPrimary text-white cursor-default hover:bg-greenDark'
            : 'bg-white text-text-darkGray hover:bg-gray-50 hover:text-text-footerMention'
        } ${isSwitchingRole ? 'opacity-50 pointer-events-none' : ''}`}
        onClick={() => {
          if (isSellerMode && userInfo?.defaultView === Constant.CHEF)
            handleSwitchRole('buyer');
        }}
        disabled={isSwitchingRole}
      >
        <FaRegUser />
        {t('common.customer')}
      </button>

      {/* Seller Button */}
      <button
        className={`flex items-center gap-[10px] font-medium px-4 h-12 transition-all ${
          isSellerMode && userInfo?.defaultView === Constant.CHEF
            ? 'bg-greenPrimary text-white cursor-default hover:bg-greenDark'
            : 'bg-white text-text-darkGray hover:bg-gray-50 hover:text-text-footerMention'
        } ${isSwitchingRole ? 'opacity-50 pointer-events-none' : ''}`}
        onClick={() => {
          if (!isSellerMode && userInfo?.defaultView === Constant.BUYER)
            handleSwitchRole('seller');
        }}
        disabled={isSwitchingRole}
      >
        <MdStorefront />
        {t('common.seller')}
      </button>
    </div>
  );
};

export default SwitchRole;
