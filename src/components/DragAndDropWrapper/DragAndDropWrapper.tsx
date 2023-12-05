import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { useRef, FC } from "react";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IDragAndDropWrapper {
  id: string;
  index: number;
  moveCard: any;
  className: string;
}

export const DragAndDropWrapper: FC<IDragAndDropWrapper> = ({
  children,
  id,
  index,
  moveCard,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      let hoverClientY = 0;
      if (clientOffset) {
        hoverClientY = clientOffset.y - hoverBoundingRect.top;
      }

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={preview}
      data-handler-id={handlerId}
      style={{ opacity }}
      className={className}
    >
      <div ref={ref}>
        <DragIcon type="primary" />
      </div>
      {children}
    </div>
  );
};
