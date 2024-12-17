import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CiLocationOn } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import CommonButton from 'src/components/CommonButton';
import Input from 'src/components/Forms/Input';
import Modal from 'src/components/Modal';
import { notifySuccess } from 'src/components/SnackbarProvider/useSnackbar';
import { getZipCode, setZipCode } from 'src/slices';
import * as z from 'zod';

const zipCodeSchema = z.object({
  zip_code: z
    .string({
      required_error: 'ZIP code is required',
    })
    .length(5, { message: 'ZIP Code length must be 5 digits' })
    .regex(/^\d+$/, { message: 'ZIP Code must be numeric' }),
});

const LocateMeModal = ({ isShowing, setIsShowing }) => {
  const dispatch = useDispatch();
  const currentZipCode = useSelector(getZipCode);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(zipCodeSchema),
  });

  const onSubmit = (data) => {
    if (!currentZipCode) {
      dispatch(setZipCode(data.zip_code));
      notifySuccess('ZIP Code has been added.');
    } else if (currentZipCode === data.zip_code) {
      notifySuccess('ZIP Code is already saved.');
    } else {
      dispatch(setZipCode(data.zip_code));
      notifySuccess('ZIP Code has been updated.');
    }

    setIsShowing(false);
    reset();
  };

  return (
    <Modal
      isShowing={isShowing}
      setIsShowing={setIsShowing}
      backDrop
      className="mx-20"
    >
      {/* Modal Header */}
      <Modal.Header>
        <div className="flex gap-1 items-center">
          <button className="text-2xl text-black/90 border-none outline-none">
            <CiLocationOn />
          </button>
          <p className="text-black/90 text-xl font-bold font-lato">
            Enter your ZIP code
          </p>
        </div>
      </Modal.Header>

      {/* Modal Body */}
      <Modal.Body>
        <p className="mb-3 font-lato text-sm">
          Let’s find locations based on your ZIP code.
        </p>
        <form id="zipCodeAdd" onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Enter ZIP code"
            defaultValue={currentZipCode || ''}
            registerProperty={register('zip_code')}
            errorText={errors?.zip_code?.message}
          />
        </form>
      </Modal.Body>

      {/* Modal Footer */}
      <Modal.Footer>
        <div className="flex items-center justify-between mt-2">
          <button
            onClick={() => setIsShowing(false)}
            className="px-8 h-[32px] md:h-[50px] font-lato border border-gray-300 text-neutral hover:bg-gray-100"
          >
            Cancel
          </button>

          <CommonButton
            form="zipCodeAdd"
            className="h-[32px] md:h-[50px]"
            type="submit"
          >
            Save
          </CommonButton>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default LocateMeModal;
