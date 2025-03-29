// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Pagination } from "@/components/ui/pagination";
// import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";

// interface Candidate {
//   id: string;
//   name: string;
//   position: string;
//   stage: keyof typeof initialCandidates;
// }

// const initialCandidates: Record<string, Candidate[]> = {
//   applied: [
//     { id: "1", name: "Alice", position: "Frontend Developer", stage: "applied" },
//     { id: "2", name: "Bob", position: "Backend Developer", stage: "applied" },
//   ],
//   screening: [],
//   interview: [],
//   offer: [],
//   rejected: [],
// };

// const PAGE_SIZE = 5;

// const KanbanBoard = () => {
//   const [candidates, setCandidates] = useState(initialCandidates);
//   const [page, setPage] = useState(0);
//   const [showAlertDialog, setShowAlertDialog] = useState(false);
//   const [candidateToMove, setCandidateToMove] = useState<Candidate | null>(null);
//   const [targetColumn, setTargetColumn] = useState<string>("");

//   const handleDragEnd = (
//     event: MouseEvent | TouchEvent,
//     info: any,
//     candidate: Candidate,
//     fromColumn: string
//   ) => {
//     const { point } = info;
//     const columnOrder = ["applied", "screening", "interview", "offer", "rejected"];

//     const fromIndex = columnOrder.indexOf(fromColumn);
//     let toIndex = fromIndex;

//     // Calculate target column based on drag position
//     const dragThreshold = 100;
//     const columnsPerScreen = 5;
//     const columnWidth = window.innerWidth / columnsPerScreen;

//     const relativeX = point.x + window.scrollX;
//     const columnIndex = Math.floor(relativeX / columnWidth);

//     if (columnIndex >= 0 && columnIndex < columnOrder.length) {
//       toIndex = columnIndex;
//       const toColumn = columnOrder[toIndex];
//       setTargetColumn(toColumn);
//       setShowAlertDialog(true);
//       setCandidateToMove(candidate);
//     }
//   };

//   const handleConfirmMove = () => {
//     if (!candidateToMove || !targetColumn) return;

//     const updatedCandidates = { ...candidates };
//     const fromColumn = candidateToMove.stage;

//     // Remove from current column
//     updatedCandidates[fromColumn] = updatedCandidates[fromColumn].filter(
//       (c) => c.id !== candidateToMove.id
//     );

//     // Add to target column
//     updatedCandidates[targetColumn].push(candidateToMove);

//     setCandidates(updatedCandidates);
//     setShowAlertDialog(false);
//     setCandidateToMove(null);
//     setTargetColumn("");
//   };

//   const handleCancelMove = () => {
//     setShowAlertDialog(false);
//     setCandidateToMove(null);
//     setTargetColumn("");
//   };

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   const paginatedCandidates = Object.entries(candidates).map(([stage, items]) => {
//     const start = page * PAGE_SIZE;
//     const end = start + PAGE_SIZE;
//     return {
//       stage,
//       items: items.slice(start, end),
//     };
//   });

//   const totalItems = Object.values(candidates).reduce(
//     (acc, items) => acc + items.length,
//     0
//   );
//   const totalPages = Math.ceil(totalItems / PAGE_SIZE);

//   return (
//     <div className="flex flex-col gap-4 p-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Candidate Pipeline</h1>
//         <Pagination
//           currentPage={page}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>

//       <div className="flex gap-4 overflow-x-auto pb-8">
//         {paginatedCandidates.map(({ stage, items }) => (
//           <motion.div
//             key={stage}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="w-64 flex-shrink-0"
//           >
//             <Card className="h-full">
//               <CardHeader className="border-b">
//                 <CardTitle className="text-lg font-semibold capitalize">
//                   {stage}
//                 </CardTitle>
//               </CardHeader>
//               <ScrollArea className="h-[500px]">
//                 <div className="p-4">
//                   <AnimatePresence>
//                     {items.map((candidate) => (
//                       <motion.div
//                         key={candidate.id}
//                         drag="x"
//                         dragConstraints={{ left: -200, right: 200 }}
//                         onDragEnd={(event, info) =>
//                           handleDragEnd(event, info, candidate, stage)
//                         }
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         className="cursor-pointer mb-2"
//                       >
//                         <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-primary transition-colors">
//                           <CardContent className="p-3">
//                             <div className="flex justify-between items-start">
//                               <div>
//                                 <p className="font-bold">{candidate.name}</p>
//                                 <p className="text-sm text-gray-600">{candidate.position}</p>
//                               </div>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="hover:bg-primary/10"
//                               >
//                                 <AlertDialogTrigger>
//                                   <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     strokeWidth={1.5}
//                                     stroke="currentColor"
//                                     className="w-5 h-5"
//                                   >
//                                     <path
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                       d="M19.5 8.25l-7.5 7.5-7.5-7.5"
//                                     />
//                                   </svg>
//                                 </AlertDialogTrigger>
//                               </Button>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                 </div>
//               </ScrollArea>
//             </Card>
//           </motion.div>
//         ))}
//       </div>

//       <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Move Candidate</AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to move {candidateToMove?.name} to {targetColumn}?
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <Button variant="outline" onClick={handleCancelMove}>
//               Cancel
//             </Button>
//             <Button onClick={handleConfirmMove}>Move</Button>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default KanbanBoard;
