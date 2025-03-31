import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // ShadCN utility for conditional classes

const borderStyles = [
  "border-t-2 border-b-2 border-primary",
  "border-l-2 border-r-2 border-primary",
  "border-t-2 border-r-2 border-primary",
  "border-b-2 border-l-2 border-primary",
  "border-t-2 border-l-2 border-b-2 border-primary",
  "border-r-2 border-b-2 border-primary",
];

const RenderGrid: React.FC<{ cols: number; rows: number; cellSize: number }> = ({ cols, rows, cellSize }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [randomBorders, setRandomBorders] = useState<Record<number, string>>({});

  const generateRandomBorders = (index: number) => {
    const newBorders: Record<number, string> = {};

    // Always highlight the hovered grid fully
    newBorders[index] = "border-2 border-primary";

    // Determine if the cell is in the first row or last row
    const isTopRow = index < cols;
    const isBottomRow = index >= cols * (rows - 1);

    // Define adjacent indexes
    const top = isTopRow ? null : index - cols;
    const bottom = isBottomRow ? null : index + cols;
    const left = index % cols !== 0 ? index - 1 : null;
    const right = (index + 1) % cols !== 0 ? index + 1 : null;
    const bottomLeft = bottom !== null && left !== null ? bottom - 1 : null;
    const bottomRight = bottom !== null && right !== null ? bottom + 1 : null;

    // Adjacent cells that we might highlight
    const adjacentIndexes = [top, bottom, left, right, bottomLeft, bottomRight].filter(
      (i) => i !== null && i >= 0 && i < cols * rows
    );

    // Randomly assign borders to adjacent cells
    adjacentIndexes.forEach((adjIndex) => {
      if (adjIndex !== null) {
        newBorders[adjIndex] = borderStyles[Math.floor(Math.random() * borderStyles.length)];
      }
    });

    setRandomBorders(newBorders);
  };

  return (
    <div
      className="grid w-full h-full"
      style={{
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        position: "relative",
      }}
    >
      {Array.from({ length: cols * rows }).map((_, index) => {
        const isTopRow = index < cols;
        const isBottomRow = index >= cols * (rows - 1);

        return (
          <div
            key={index}
            className={cn(
              "border border-border transition-all duration-300",
              randomBorders[index] || "",
              isTopRow && "border-t-0",
              isBottomRow && "border-b-0"
            )}
            style={{ 
              width: cellSize, 
              height: cellSize,
              opacity: 0.2
            }}
            onMouseEnter={() => {
              setHoverIndex(index);
              generateRandomBorders(index);
            }}
            onMouseLeave={() => {
              setHoverIndex(null);
              setRandomBorders({});
            }}
          />
        );
      })}
    </div>
  );
};

const HeroGrid: React.FC = () => {
  const [cellSize, setCellSize] = useState(0);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);

  useEffect(() => {
    const updateGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const newCellSize = Math.floor(Math.min(width, height) / 12);
      setCellSize(newCellSize);
      setCols(Math.floor(width / newCellSize));
      setRows(Math.floor(height / newCellSize));
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  return <RenderGrid cols={cols} rows={rows} cellSize={cellSize} />;
};

export default HeroGrid;
