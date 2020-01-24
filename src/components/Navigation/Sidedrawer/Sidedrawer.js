
import React from 'react';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./Sidedrawer.module.css";
const sidedrawer = (props) =>{

    //...
    return (
        <div className={styles.Sidedrawer}>
            <div className={styles.Logo}>
            <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
    );
};
export default sidedrawer;