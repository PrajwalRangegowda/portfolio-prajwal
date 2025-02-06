"use client"
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons';

export default function ProtectedMenu(props){
    const { data: session } = useSession(); 

    return(
<>
<nav className={props.Class}>
      <ul>
        <br/>
        <hr/>
        {session && ( 
          <li>
            <a href="/protected"><FontAwesomeIcon icon={faGear} size="sm" />&nbsp;Settings</a>
          </li>
        )}
        
      </ul>
    </nav>
</>
    );
}