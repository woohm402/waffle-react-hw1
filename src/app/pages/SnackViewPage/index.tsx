import { useParams } from 'react-router';

export const SnackViewPage = () => {
  const { snackId } = useParams();
  if (!snackId) throw new Error();

  return <>과자 {snackId}</>;
};
