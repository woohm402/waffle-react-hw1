import { Link, Outlet, useLocation } from 'react-router-dom';

import { classNames } from '../../../utils/classNames';
import styles from './index.module.css';

export const Layout = () => {
  const { pathname } = useLocation();

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
        </a>

        <h1 className={styles.title} data-testid="header-title">
          과자 리뷰
        </h1>

        {[
          { to: '/', label: '리뷰' },
          { to: '/snacks', label: '과자' },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={classNames(styles.menuItem, to === pathname && styles.active)}
            data-testid="menu-item"
          >
            {label}
          </Link>
        ))}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
