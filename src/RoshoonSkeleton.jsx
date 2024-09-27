import React from 'react';
import { Stack, Skeleton } from '@mui/material';

const RoshoonSkeleton = () => {
  return (
    <Stack paddingTop={5} gap={1} flex="auto">
      <Stack direction="row" gap={3}>
        <Skeleton variant="rectangular" width={300} height={60} />
        <Skeleton variant="rectangular" width={300} height={60} />
        <Skeleton variant="rectangular" width={300} height={60} />
      </Stack>
      <Stack direction="row" gap={3} flex="auto">
        <Skeleton variant="rectangular" width={300} height={60} />
        <Skeleton variant="rectangular" width={300} height={60} />
      </Stack>
    </Stack>
  );
};

export default RoshoonSkeleton;
