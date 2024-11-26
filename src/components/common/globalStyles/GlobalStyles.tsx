import { PropsWithChildren } from 'react';
import './GlobalStyles.scss';

type Props = {};

const GlobalStyles = (props: PropsWithChildren<Props>) => {
  return <>{props.children}</>;
};

export default GlobalStyles;