"use client";
import axios from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const DataContext = createContext();

const ContextAPI = (props) => {
	const [loader, setLoader] = useState(false);
	const [JournalistList, setJournalistList] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [search, setSearch] = useState("");
	const [blogs, setBlogs] = useState([]);

	const getJournalistList = useCallback(async () => {
		await axios
			.get(`${process.env.NEXT_PUBLIC_BASE_URL}/journalist/all-journalists`, {
				params: {
					page: page,
					limit: 10,
					search: search,
				},
			})
			.then((res) => {
				console.log(" --------");
				console.log("res:", res);
				console.log(" --------");
				setJournalistList(res.data.data);
				setTotalPage(res.data.totalPage);
			})
			.catch((err) => toast.error(err.response.data.message));
	}, [page, search]);

	useEffect(() => {
		getJournalistList();
	}, [page, search]);
	return (
		<DataContext.Provider
			value={{
				loader,
				setLoader,
				setSearch,
				setPage,
				setJournalistList,
				JournalistList,
				totalPage,
				setBlogs,
				blogs,
				getJournalistList,
			}}
		>
			{props.children}
		</DataContext.Provider>
	);
};

export default ContextAPI;
