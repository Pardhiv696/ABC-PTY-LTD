import React, { useReducer } from "react";
import CommonHeader from "./CommonHeader";
import CommonFooter from "./CommonFooter";
import Topbar from "./Topbar";
import Breadcrumb from "../common/Breadcrumb";
import RightSideBar from "../common/RightSideBar";
import Head from "next/head";
import ContextAPI from "@/utils/context/ContextAPI";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initalState = {
	isRightSidebarOpen: false,
	isleftSidebarOpen: false,
	isModal: false,
	activeMenu: "",
	activeSubMenu: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "TOGGLE_RIGHT_SIDEBAR":
			return {
				...state,
				isRightSidebarOpen: !state.isRightSidebarOpen,
			};
		case "TOGGLE_LEFT_SIDEBAR":
			return {
				...state,
				isleftSidebarOpen: !state.isleftSidebarOpen,
			};
		case "TOGGLE_SEARCH_MODAL":
			return {
				...state,
				isModal: !state.isModal,
			};
		case "SET_SCROllY":
			return { ...state, scrollY: action.payload };
		case "TOGGLE_MENU":
			return {
				...state,

				activeMenu: state.activeMenu === action.menu ? "" : action.menu,
				activeSubMenu:
					state.activeMenu === action.menu ? state.activeSubMenu : "",
			};
		case "TOGGLE_SUB_MENU":
			return {
				...state,
				activeSubMenu:
					state.activeSubMenu === action.subMenu ? "" : action.subMenu,
			};
		case "TOGGLE_SIDEBAR_MENU":
			return {
				...state,
				isSidebarOpenMenu: !state.isSidebarOpenMenu,
			};
		default:
			return state;
	}
}
function MainLayout({ children }) {
	const [state, dispatch] = useReducer(reducer, initalState);

	return (
		<>
			<Head>
				<title>ABC PTY LTD</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="assets/images/logo/logo-icon.svg" />
			</Head>
			<ToastContainer />
			<Topbar />
			<RightSideBar state={state} dispatch={dispatch} />
			<CommonHeader state={state} dispatch={dispatch} />
			<Breadcrumb />
			<ContextAPI>{children}</ContextAPI>
			<CommonFooter />
		</>
	);
}

export default MainLayout;
