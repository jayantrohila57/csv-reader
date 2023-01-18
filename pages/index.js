/* eslint-disable react/jsx-key */
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCSVReader } from "react-papaparse";
import { useCSVDownloader } from "react-papaparse";
import Tables from "../components/Tables";

const Index = () => {
	const { CSVReader } = useCSVReader();
	const { CSVDownloader, Type } = useCSVDownloader();
	const [products, setProducts] = useState([]);
	const [columnData, setColumnData] = useState([]);
	const [rowData, setRowData] = useState([]);

	const onHandleFileLoad = () => {
		const column = products[0]?.map((col) => {
			return {
				Header: col,
				accessor: col.split(" ").join("_").toLowerCase(),
			};
		});
		const row = products?.slice(1).map((rows) => {
			return rows.reduce((acc, curr, i) => {
				acc[column[i].accessor] = curr;
				return acc;
			}, {});
		});
		setColumnData(column);
		setRowData(row);
	};
	const columns = useMemo(() => columnData, [columnData]);
	const dataSource = useMemo(() => rowData, [rowData]);
	return (
		<>
			<Head>
				<title>CSV Reader — Preview, Sort, Download</title>
				<meta name="title" content="CSV Reader — Preview, Sort, Download" />
				<meta
					name="description"
					content="With CSV Viewer you can preview how your CSV will look in a table"
				/>
			</Head>
			<header className="px-2 sm:px-4 py-2.5 rounded ">
				<div className="container flex flex-wrap items-center justify-between mx-auto">
					<Link href="/" className="flex text-gray-900 items-center">
						<span className="self-center text-xl font-extralight whitespace-nowrap ">
							CSV Viewer
						</span>
					</Link>
				</div>
			</header>
			<main>
				<section className="text-gray-900 body-font">
					<div className="container px-5 py-24 mx-auto">
						<div className="flex flex-col text-center  w-full mb-12">
							<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 ">
								CSV Viewer
							</h1>
							<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
								Please Upload CSV file to view the data.
							</p>
						</div>
						<div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
							<div className="relative flex-grow w-full">
								<div className="flex items-center justify-center w-full">
									<label
										htmlFor="dropzone-file"
										className="flex flex-col items-center justify-center w-full "
									>
										<div className="flex flex-col items-center justify-center pt-5 pb-6">
											<CSVReader
												onUploadAccepted={(results) => {
													setProducts(results.data);
													onHandleFileLoad();
												}}
											>
												{({
													getRootProps,
													acceptedFile,
													getRemoveFileProps,
												}) => (
													<>
														<div>
															{acceptedFile ? (
																<div className="flex h-64 w-80 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200 border-2  flex-col items-center justify-center pt-5 pb-6">
																	{/* {ProgressBar} */}
																	<div>{acceptedFile && acceptedFile.name}</div>
																	<button
																		className="focus:outline-none m-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
																		{...getRemoveFileProps()}
																	>
																		Remove
																	</button>
																	<button
																		className="focus:outline-none m-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
																		// {...(handleOpenCsvReader = {}())}
																	>
																		Continue
																	</button>
																</div>
															) : (
																<button
																	type="button"
																	className="flex h-64 w-80 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200 border-2  flex-col items-center justify-center pt-5 pb-6"
																	{...getRootProps()}
																>
																	<svg
																		aria-hidden="true"
																		className="w-10 h-10 mb-3 text-gray-900"
																		fill="none"
																		stroke="currentColor"
																		viewBox="0 0 24 24"
																		xmlns="http://www.w3.org/2000/svg"
																	>
																		<path
																			strokeLinecap="round"
																			strokeLinejoin="round"
																			strokeWidth="2"
																			d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
																		></path>
																	</svg>
																	<p className="mb-2 text-sm text-gray-900 dark:text-gray-900">
																		<span className="font-semibold">
																			Click to upload
																		</span>{" "}
																		or drag and drop
																	</p>
																	<p className="text-xs text-gray-900 dark:text-gray-900">
																		CSV file only
																	</p>
																</button>
															)}
														</div>
													</>
												)}
											</CSVReader>{" "}
										</div>
										{/* <input id="dropzone-file" type="file" className="hidden" /> */}
									</label>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section>
					<CSVDownloader
						type={Type.Button}
						filename={"filename"}
						bom={true}
						config={{
							delimiter: ";",
						}}
						data={products}
					>
						Download
					</CSVDownloader>
				</section>
				<section>
					<Tables columns={columns} dataSource={dataSource} />
				</section>
			</main>
			<footer className="text-gray-600 body-font">
				<div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
					<a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
						<span className="ml-3 text-sm font-light">CSV Viewer</span>
					</a>
					<p className="text-sm text-gray-900 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-500 sm:py-2 sm:mt-0 mt-4">
						© 2023 csv viewer —
						<a
							href="https://github.com/jayantrohila57"
							className="text-blue-400 ml-1"
							rel="noopener noreferrer"
							target="_blank"
						>
							@jayantrohila57
						</a>
					</p>
					<span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
						<a className="text-gray-900">
							<svg
								fill="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="w-5 h-5"
								viewBox="0 0 24 24"
							>
								<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
							</svg>
						</a>
						<a className="ml-3 text-gray-900">
							<svg
								fill="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="w-5 h-5"
								viewBox="0 0 24 24"
							>
								<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
							</svg>
						</a>
						<a className="ml-3 text-gray-900">
							<svg
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="w-5 h-5"
								viewBox="0 0 24 24"
							>
								<rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
								<path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
							</svg>
						</a>
						<a className="ml-3 text-gray-900">
							<svg
								fill="currentColor"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="0"
								className="w-5 h-5"
								viewBox="0 0 24 24"
							>
								<path
									stroke="none"
									d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
								></path>
								<circle cx="4" cy="4" r="2" stroke="none"></circle>
							</svg>
						</a>
					</span>
				</div>
			</footer>
		</>
	);
};

export default Index;
