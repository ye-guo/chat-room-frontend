import styles from './index.less';

export default function NavButton({
  icon,
  active,
  onClick,
}: {
  icon?: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={`${styles.nav_button} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      <img src={icon} alt="icon" id={styles.icon} />
    </div>
  );
}
