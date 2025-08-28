/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Pagination } from '@mui/material'
import { scrollTop } from 'app/util'
import style from './style.module.scss'

interface XPaginationProps {
    totalPage: number,
    onChangePage: (page: number) => void,
    defaultPage: any,
    className?:string,
}

export function XPagination(props: XPaginationProps) {
    const { totalPage, onChangePage, defaultPage, className='' } = props;
    const onChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        onChangePage(value)
        scrollTop()
    }
    return (
        <div className={`${style.container} ${className}`}>
            <Pagination
                onChange={onChange}
                defaultPage={parseInt(defaultPage)} 
                page={parseInt(defaultPage)}
                count={totalPage}
                color="primary"
            />
        </div>
    );
}