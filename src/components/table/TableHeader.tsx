import React from 'react';
import styles from './Table.module.scss';

export const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <th className={styles.header}>{children}</th>;
};
