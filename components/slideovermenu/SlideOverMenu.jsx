import { useState, useImperativeHandle, forwardRef } from "react";
import styles from "./SlideOverMenu.module.css"; // Importing CSS module for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars , faXmark } from '@fortawesome/free-solid-svg-icons';
import SideMenu  from "../SideMenu";
import LoginButton from "../LoginButton";
import ProtectedMenu from "./ProtectedMenu";
const SlideOverMenu = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useImperativeHandle(ref, ()=> ({
    toggleMenu,
  }))

  return (
    <>
      <button className={isOpen ? styles.hide : styles.openButton} onClick={toggleMenu}>
      <FontAwesomeIcon icon={faBars} size="lg"/>
      </button>
      <div className={`${styles.menu} ${isOpen ? styles.open :  styles.hide}`}>
        
        <div className={styles.menuContent}>
          <button className={styles.closeButton} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faXmark} size="lg"/>&thinsp;
            Close
          </button>
          <LoginButton/>
         <SideMenu Class={styles.nav}/>
         <ProtectedMenu Class={styles.nav}/>
        </div>
        <button className={ isOpen ? styles.Backdrop:styles.hide} onClick={toggleMenu}>
        </button>
      </div>
    </>
  );
});

export default SlideOverMenu;
