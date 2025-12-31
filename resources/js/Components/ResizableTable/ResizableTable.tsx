import { useState, useRef, useEffect, ReactNode } from "react";

export interface ResizableColumn {
    key: string;
    label: string;
    align?: "left" | "right" | "center";
    defaultWidth?: number;
    render?: (row: any) => ReactNode;
    className?: string;
}

interface ResizableTableProps<T> {
    columns: ResizableColumn[];
    data: T[];
    storageKey: string;
    className?: string;
    rowKey?: (row: T) => string | number;
    onRowClick?: (row: T) => void;
    renderCheckbox?: (row: T) => ReactNode;
    renderActions?: (row: T) => ReactNode;
}

export default function ResizableTable<T extends Record<string, any>>({
    columns,
    data,
    storageKey,
    className = "",
    rowKey = (row) => row.id,
    onRowClick,
    renderCheckbox,
    renderActions,
}: ResizableTableProps<T>) {
    // Initialize column widths from localStorage or defaults
    const getDefaultWidths = () => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Merge with defaults to handle new columns
                const widths: Record<string, number> = {};
                columns.forEach((col) => {
                    widths[col.key] =
                        parsed[col.key] || col.defaultWidth || 150;
                });
                return widths;
            } catch {
                // If parsing fails, use defaults
            }
        }
        const widths: Record<string, number> = {};
        columns.forEach((col) => {
            widths[col.key] = col.defaultWidth || 150;
        });
        return widths;
    };

    const [columnWidths, setColumnWidths] =
        useState<Record<string, number>>(getDefaultWidths);

    const [resizingColumn, setResizingColumn] = useState<string | null>(null);
    const [resizeStartX, setResizeStartX] = useState(0);
    const [resizeStartWidth, setResizeStartWidth] = useState(0);
    const [resizeLineX, setResizeLineX] = useState<number | null>(null);
    const tableRef = useRef<HTMLTableElement>(null);

    // Save to localStorage when widths change
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(columnWidths));
    }, [columnWidths, storageKey]);

    // Update widths when columns change
    useEffect(() => {
        setColumnWidths((prev) => {
            const updated = { ...prev };
            let changed = false;
            columns.forEach((col) => {
                if (!(col.key in updated)) {
                    updated[col.key] = col.defaultWidth || 150;
                    changed = true;
                }
            });
            return changed ? updated : prev;
        });
    }, [columns]);

    const handleResizeStart = (column: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setResizingColumn(column);
        setResizeStartX(e.clientX);
        setResizeStartWidth(
            columnWidths[column] ||
                columns.find((c) => c.key === column)?.defaultWidth ||
                150
        );
    };

    useEffect(() => {
        if (!resizingColumn) {
            setResizeLineX(null);
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            const diff = e.clientX - resizeStartX;
            const newWidth = Math.max(50, resizeStartWidth + diff);
            setColumnWidths((prev) => ({
                ...prev,
                [resizingColumn]: newWidth,
            }));

            // Update resize line position
            if (tableRef.current) {
                const rect = tableRef.current.getBoundingClientRect();
                const relativeX = e.clientX - rect.left;
                setResizeLineX(relativeX);
            }
        };

        const handleMouseUp = () => {
            setResizingColumn(null);
            setResizeLineX(null);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [resizingColumn, resizeStartX, resizeStartWidth]);

    const getAlignmentClass = (align?: "left" | "right" | "center") => {
        switch (align) {
            case "right":
                return "text-right";
            case "center":
                return "text-center";
            default:
                return "text-left";
        }
    };

    return (
        <div
            className={`relative ${className}`}
            style={resizingColumn ? { userSelect: "none" } : {}}
        >
            {/* Resize line indicator */}
            {resizeLineX !== null && (
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-blue-500 z-50 pointer-events-none"
                    style={{
                        left: `${resizeLineX}px`,
                        transform: "translateX(-50%)",
                    }}
                />
            )}
            <div className="overflow-x-auto shadow-sm ring-1 ring-gray-200 ring-opacity-5 rounded-lg">
                <table
                    ref={tableRef}
                    className="min-w-full divide-y divide-gray-200"
                    style={{ tableLayout: "fixed", width: "100%" }}
                >
                    <thead className="bg-gray-50">
                        <tr>
                            {renderCheckbox && (
                                <th className="w-20 px-4 py-3 text-left">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </div>
                                </th>
                            )}
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-700 whitespace-nowrap relative group select-none ${getAlignmentClass(
                                        column.align
                                    )}`}
                                    style={{ width: columnWidths[column.key] }}
                                >
                                    <div
                                        className={`flex items-center ${
                                            column.align === "right"
                                                ? "justify-end pr-2"
                                                : column.align === "center"
                                                ? "justify-center pr-2"
                                                : "justify-between pr-2"
                                        }`}
                                    >
                                        <span>{column.label}</span>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                                            <div className="w-0.5 h-3 bg-gray-300 rounded"></div>
                                            <div className="w-0.5 h-3 bg-gray-300 rounded"></div>
                                            <div className="w-0.5 h-3 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                    <div
                                        className={`absolute top-0 right-0 w-3 h-full cursor-col-resize transition-all ${
                                            resizingColumn === column.key
                                                ? "bg-blue-500 opacity-100"
                                                : "bg-transparent group-hover:bg-blue-100 opacity-0 group-hover:opacity-100"
                                        }`}
                                        onMouseDown={(e) =>
                                            handleResizeStart(column.key, e)
                                        }
                                        style={{
                                            cursor: "col-resize",
                                            userSelect: "none",
                                            zIndex: 10,
                                        }}
                                        title="Drag to resize column"
                                    />
                                </th>
                            ))}
                            {renderActions && (
                                <th className="w-20 px-4 py-3 text-left"></th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {data.map((row) => (
                            <tr
                                key={rowKey(row)}
                                className={`group hover:bg-gray-50 transition-colors ${
                                    onRowClick ? "cursor-pointer" : ""
                                }`}
                                onClick={() => onRowClick?.(row)}
                            >
                                {renderCheckbox && (
                                    <td className="px-4 py-4">
                                        {renderCheckbox(row)}
                                    </td>
                                )}
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={`px-4 py-4 text-sm whitespace-nowrap overflow-hidden text-start text-ellipsis ${getAlignmentClass(
                                            column.align
                                        )} ${column.className || ""} ${
                                            column.key === columns[0]?.key
                                                ? "font-medium text-gray-900"
                                                : "text-gray-500"
                                        }`}
                                        style={{
                                            width: columnWidths[column.key],
                                        }}
                                    >
                                        {column.render
                                            ? column.render(row)
                                            : row[column.key] || "—"}
                                    </td>
                                ))}
                                {renderActions && (
                                    <td className="px-4 py-4">
                                        {renderActions(row)}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
