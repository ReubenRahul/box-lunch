import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faShoppingCart , faMoneyBill, faHatCowboySide, faPizzaSlice} from '@fortawesome/free-solid-svg-icons'
import "./css/LunchBox.css"
import { Link } from 'react-router-dom';


const LunchBox = () => {
    return (
      <div>
        <header>
            <div className="header">
              <ul className="header-ul">
                  <li> <Link to = "/"> <FontAwesomeIcon icon={faUserFriends } /> </Link> </li>
                  <li>  <Link  to="/order">  <FontAwesomeIcon icon={faShoppingCart} /> </Link> </li>
                  <li>  <Link  to="/vendors">  <FontAwesomeIcon icon={faPizzaSlice} /> </Link> </li>
                  <li> <a> <FontAwesomeIcon icon={faMoneyBill} /> </a> </li>
              </ul>

            </div>

        </header>
      </div>
    )
}

export default LunchBox;
