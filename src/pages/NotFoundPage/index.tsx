import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

function NotFoundPage(): JSX.Element {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Page Not Found</h2>
      <p className={styles.text}>
        Похоже, данная страница не существует :&#40;
      </p>
      <Link to="/" className={styles.link}>
        На главную
      </Link>
    </div>
  );
}

export default NotFoundPage;
