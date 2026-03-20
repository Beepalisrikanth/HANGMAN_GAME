import logo from "../assets/logo.png"
import menu from "../assets/menu.png"
import profile from "../assets/profile.png"
import "./NavBar.css"

const NavBar = () => {
    return (
        <div className="outerNavBar">
            <div className="innerNavBar">
                <div className="leftNav">
                    <img src={menu} alt="barmenu"></img>
                    <img src={logo} alt="title"></img>
                </div>
                <div className="rightNav">
                    {/* <input type="search" id="inputSearch" placeholder="enter the input"/> */}
                    <img src={profile} alt="profile logo" ></img>
                </div>
            </div>
        </div>
    )
}

export default NavBar
