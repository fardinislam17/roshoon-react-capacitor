import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CiLocationOn } from 'react-icons/ci';
import CommonButton from 'src/components/CommonButton';
import Input from 'src/components/Forms/Input';
import { notifySuccess } from 'src/components/SnackbarProvider/useSnackbar';
import { LocalStorageService } from 'src/utils/LocalStorage';
import * as z from 'zod';

const zipCodeSchema = z.object({
  zip_code: z
    .string()
    .length(5, { message: 'errors.validationMessage.zipCodeLength' })
    .regex(/^\d+$/, {
      message: 'errors.validationMessage.zipCodeNumericMessage',
    }),
});

const LocateMeModal = ({ isShowing, setIsShowing }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(zipCodeSchema),
  });

  const currentZipCode = LocalStorageService.get('roshoonZipCode');

  const onSubmit = (data) => {
    if (!currentZipCode) {
      LocalStorageService.set('roshoonZipCode', data.zip_code);
      notifySuccess(t('notifyMessage.zipCodeAddedMessage'));
    } else if (currentZipCode === data.zip_code) {
      notifySuccess(t('notifyMessage.zipCodeAlreadyAddedMessage'));
    } else {
      LocalStorageService.set('roshoonZipCode', data.zip_code);
      notifySuccess(t('notifyMessage.zipCodeUpdatedMessage'));
    }

    setIsShowing(false);
    reset();
  };

  return (
    <Dialog
      open={isShowing}
      onClose={() => setIsShowing(false)}
      maxWidth="sm"
      fullWidth
      className="px-14"
    >
      {/* Modal Header */}
      <DialogTitle>
        <div className="flex gap-2 items-center px-5 pt-5">
          <CiLocationOn size={24} />
          <Typography variant="h6" fontWeight="bold">
            {t('placeholder.enterZIPCode')}
          </Typography>
        </div>
      </DialogTitle>

      {/* Modal Body */}
      <DialogContent>
        <form
          id="zipCodeAdd"
          onSubmit={handleSubmit(onSubmit)}
          className="px-5 pb-5"
        >
          <Input
            placeholder="placeholder.enterZIPCode"
            defaultValue={currentZipCode || ''}
            registerProperty={register('zip_code')}
            errorText={errors?.zip_code?.message}
          />
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={() => setIsShowing(false)}
              className="px-8 h-[32px] md:h-[50px] font-lato border border-gray-300 text-neutral hover:bg-gray-100"
            >
              {t('common.cancel')}
            </button>

            <CommonButton
              customHeight={'h-[32px] md:h-[50px]'}
              form="zipCodeAdd"
              type="submit"
            >
              {t('common.save')}
            </CommonButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LocateMeModal;
