"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function SortableItem({
  task,
  columnId,
}: {
  task: any;
  columnId: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      data: { columnId },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="bg-white dark:bg-zinc-900 shadow cursor-grab">
        <CardContent className="p-4">{task.title}</CardContent>
      </Card>
    </motion.div>
  );
}
