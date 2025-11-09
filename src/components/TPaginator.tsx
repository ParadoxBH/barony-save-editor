import { useState } from "react";
import { TablePagination as MuiTablePagination } from "@mui/material";

export interface TPaginatorInfo {
  page: number,
  limite: number,
}

export interface TPaginator {
  info: TPaginatorInfo;
  setInfo: (value: TPaginatorInfo) => VoidFunction;
  count: number;
  setCount: (value: number) => void;
}

export function usePaginator()
{
    const [info, setInfo] = useState<TPaginatorInfo>({page: 0, limite: 25});
    const [count, setCount] = useState<number>(0);

    return {info, setInfo, count, setCount} as TPaginator
}

export function TablePaginator({pages}: {pages: TPaginator})
{
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    pages.setInfo({page: newPage, limite: pages.info.limite});
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    pages.setInfo({page: 0, limite: parseInt(event.target.value, 10)});
  };

  return <MuiTablePagination
      component="div"
      count={pages.count}
      page={pages.info.page}
      onPageChange={handleChangePage}
      rowsPerPage={pages.info.limite}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{overflow: "hidden", height: 52}}
    />
}