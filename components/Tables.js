/* eslint-disable react/jsx-key */
import {
	Button,
	Center,
	Heading,
	Image,
	Spinner,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy } from "react-table";

function Tables({ columns, data }) {
	// Use the state and functions returned from useTable to build your UI
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns,
			data,
		});

	// Render the UI for your table
	return (
		<>
			<Table variant="striped" colorScheme="orange" {...getTableProps()}>
				<Thead>
					{headerGroups.map((headerGroup) => (
						<Tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<Th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render("Header")}
									{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
									{}
								</Th>
							))}
						</Tr>
					))}
				</Thead>
				<Tbody {...getTableBodyProps()}>
					{rows.map((row, i) => {
						prepareRow(row);

						return (
							<Tr {...row.getRowProps()}>
								{row.cells.map((cell) => (
									<Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
								))}
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</>
	);
}

export default Tables;
