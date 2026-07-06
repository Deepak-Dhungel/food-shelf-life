import { useRef, useState } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Pass display classes like "hidden max-sm:block" to control when the sheet appears */
  className?: string;
}

const DRAG_CLOSE_THRESHOLD = 80;

export default function BottomSheet({
  isOpen,
  onClose,
  children,
  className = "",
}: BottomSheetProps) {
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartY = useRef(0);

  const handleDragStart = (e: React.PointerEvent) => {
    setDragging(true);
    dragStartY.current = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragOffset(Math.max(0, e.clientY - dragStartY.current));
  };

  const handleDragEnd = () => {
    setDragging(false);
    if (dragOffset > DRAG_CLOSE_THRESHOLD) onClose();
    setDragOffset(0);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-20 bg-black/50 ${className}`}
          onClick={onClose}
        />
      )}

      {/* Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 bg-white rounded-t-3xl shadow-[0_-8px_32px_rgba(0,0,0,0.18)] ${
          dragging ? "" : "transition-transform duration-300 ease-in-out"
        } ${isOpen ? "translate-y-0" : "translate-y-[calc(100%+4rem)]"} ${className}`}
        style={
          dragging ? { transform: `translateY(${dragOffset}px)` } : undefined
        }
      >
        {/* Drag handle */}
        <div
          className="flex justify-center py-3 -mx-0 cursor-grab active:cursor-grabbing touch-none select-none"
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
        >
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {children}
      </div>
    </>
  );
}
