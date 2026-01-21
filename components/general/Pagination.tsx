import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-20 mt-6">
      <p className="text-sm text-[#78716e]">
        Page {page} of {totalPages}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="px-3 py-2 bg-[#e77818] cursor-pointer rounded-lg border border-[#e9e1d7] text-sm disabled:opacity-50 hover:bg-[#fdf8f4]"
        >
          Previous
        </button>

        <button
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-2 bg-[#e77818] cursor-pointer rounded-lg border border-[#e9e1d7] text-sm disabled:opacity-50 hover:bg-[#fdf8f4]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
