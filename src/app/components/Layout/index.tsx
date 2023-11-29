import { type PropsWithChildren } from 'react';

import styles from './index.module.css';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <header data-testid="header" className={styles.header}>
        <a href="https://wafflestudio.com">
          <img
            className={styles.logo}
            src="https://www.wafflestudio.com/static/images/logo/waffle_logo_title.png"
            data-testid="waffle-logo"
            alt="와플스튜디오"
          />
          <h1 className={styles.title} data-testid="header-title">
            과자 리뷰
          </h1>
        </a>
      </header>
      <main>{children}</main>
    </div>
  );
};
