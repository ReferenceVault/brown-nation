import { TableRow, Td } from "./Table";
import Skeleton from "./Skeleton";

/** Placeholder rows shown in a Table's body during the initial load. */
export default function TableSkeleton({ rows = 8, columns }: { rows?: number; columns: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Td key={colIndex}>
              <Skeleton className="h-4" style={{ width: `${55 + ((rowIndex * 7 + colIndex * 13) % 40)}%` }} />
            </Td>
          ))}
        </TableRow>
      ))}
    </>
  );
}
