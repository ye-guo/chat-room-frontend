import styles from './index.less'

export default function NavButton({icon}:{icon?: string}) {
  return (
    <div className={styles.nav_button}>
      <img src={icon} alt="icon" id={styles.icon}/>
    </div>
  )
}
