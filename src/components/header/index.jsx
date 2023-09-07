import React from "react";
import OthersDevicesNavTemp from "./OthersDevicesNavTemp";
import NavMobileDevicesMenu from "./NavMobileDevicesMenu";
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./style.css";

/* eslint-disable react/react-in-jsx-scope */
const Header = (props) => {
    const [clickState, setClickState] = React.useState(false);
    // eslint-disable-next-line no-undef
    function clickOnHamburgerBtnEventHandler(clickBool) {
        clickBool ?
            (
                mobileClsValue = "grid grid-rows-1 h-1 invisible"
            ) : (
                mobileClsValue = props.clsNameOfMobileNav
            );
        return mobileClsValue;
    }

    var mobileClsValue = props.clsNameOfMobileNav;

    React.useEffect(() => {
        mobileClsValue = clickOnHamburgerBtnEventHandler(clickState); 
        console.log("Now clickState is in " + new String(clickState).toUpperCase())
    }, [clickState]);

    return (
        <header className="flex flex-col mb-1 space-y-1.5 w-auto md:mb-1 lg:mb-1 xl:mb-1 2xl:mb-1" id="home_container">
            <div className="fixed top-0 flex flex-row rounded-lg bg-zinc-600 mx-0 px-6 py-2 border-2 border-black w-full opacity-90 md:relative md:w-auto 
            md:mx-7 md:mt-1 lg:relative lg:w-auto lg:mx-7 lg:mt-1 xl:relative xl:w-auto xl:mx-7 xl:mt-1 2xl:mx-4 2xl:relative 2xl:w-auto 2xl:mt-1" 
            id="main_title"
            >
                <div className="visible mt-0 px-0 py-3 pb-11 w-fit rounded-lg space-y-3.5 md:invisible md:py-0 md:pb-1 lg:invisible 
                lg:py-0 lg:pb-0 xl:invisible xl:py-0 xl:pb-0 2xl:invisible 2xl:py-0 2xl:pb-0"
                >
                    <button className="visible rounded-lg shadow-sm shadow-zinc-200 mb-3 ml-1 mr-auto px-2 py-1 w-8
                    h-8 text-md text-french-rose md:invisible active:bg-zinc-500 active:text-cyan-50 lg:invisible 
                    xl:invisible 2xl:invisible" onClick={() => {
                            clickState === false ? (
                                setClickState(() => true)
                            ) : (
                                setClickState(() => false)
                            )
                            console.log("NavModal es "+clickState)
                        }
                    }>
                        {
                            !clickState ? <GiHamburgerMenu /> : <IoCloseSharp />
                        }  
                    </button>
                </div>
                
                <Link to="/#" className="flex text-3xl ml-auto px-1 rounded-3xl bg-zinc-600 text-center text-french-rose 
                font-bold mt-12 mb-4 space-x-1 xl:text-5xl 2xl:text-5xl" id="brand"
                >
                    Givilluzpe 
                    <img src="https://storage.googleapis.com/givilluz-store-bucket/logotipo.png" width="28rem" height="20rem" className="ml-2" />
                </Link>
                <ul className="ml-auto text-sm text-white">
                    <li>Instagram</li>
                    <li>Facebook</li>
                    <li>Telegram</li>
                </ul>
            </div>
            {
                clickState && <React.Fragment><NavMobileDevicesMenu/></React.Fragment>
            }
            <OthersDevicesNavTemp />
        </header>
    )
}

export default Header;