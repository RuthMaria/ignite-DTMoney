import React from 'react';
import { CaretLeft, CaretRight } from 'phosphor-react';

import { usePagination, DOTS } from '../../hooks/usePagination';

import { Button, GroupButton, Span, ButtonCaret } from './styles';

type PropsPagination = {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
  onPageChange: (value: React.SetStateAction<number>) => void;
};

const Pagination: React.FC<PropsPagination> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <GroupButton>
      <ButtonCaret disabled={currentPage === 1} onClick={onPrevious}>
        <CaretLeft weight="bold" />
      </ButtonCaret>

      {paginationRange.map((page, index) => {
        if (page === DOTS) {
          return <Span key={index}>{page}</Span>;
        }

        return (
          <Button
            key={index}
            isSelected={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        );
      })}

      <ButtonCaret disabled={currentPage === lastPage} onClick={onNext}>
        <CaretRight />
      </ButtonCaret>
    </GroupButton>
  );
};

export default Pagination;
