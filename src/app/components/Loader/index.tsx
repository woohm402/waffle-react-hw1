import { type SVGProps } from 'react';

import LoaderSvg from '../../assets/spinner.svg?react';

export const Loader = (props: SVGProps<SVGSVGElement>) => {
  return <LoaderSvg {...props} />;
};
