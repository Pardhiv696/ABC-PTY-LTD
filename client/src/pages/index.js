import Preloader from "@/components/common/Preloader";
import RightSideBar from "@/components/common/RightSideBar";
import AuthorFeature from "@/components/home2/AuthorFeature";
import Hero from "@/components/home2/Hero";
import RecentPost from "@/components/home2/RecentPost";
import TrandingArticle from "@/components/home2/TrandingArticle";
import CommonFooter from "@/components/layout/CommonFooter";
import CommonHeader from "@/components/layout/CommonHeader";
import Topbar from "@/components/layout/Topbar";
import ContextAPI from "@/utils/context/ContextAPI";
import React, { useEffect, useReducer, useState } from "react";
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
function Home() {
	const [state, dispatch] = useReducer(reducer, initalState);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(false);
		setTimeout(() => {
			setLoading(true);
		}, 3000);
	}, []);
	return (
		<>
			{loading ? (
				<ContextAPI>
					<Topbar />
					<RightSideBar state={state} dispatch={dispatch} />
					<CommonHeader state={state} dispatch={dispatch} />
					<Hero />
					<RecentPost />
					<TrandingArticle />
					<AuthorFeature />
					<CommonFooter />
				</ContextAPI>
			) : (
				<Preloader />
			)}
		</>
	);
}

export default Home;
