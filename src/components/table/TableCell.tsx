import React from 'react';
import styles from './Table.module.scss';
import clsx from 'clsx';
import { TableCellProps } from '@/types';


export const TableCell: React.FC<TableCellProps> = ({ className, children }) => {
    return <td className={clsx(styles.cell, className)}>{children}</td>;
};