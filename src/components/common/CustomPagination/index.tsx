import { Pagination, PaginationProps } from 'antd';
import styles from './style.module.scss';

const CustomPagination = (props: PaginationProps) => {
  return <Pagination className={styles.pagination} {...props} />;
};

export default CustomPagination;
