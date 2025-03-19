import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import CategoryItem from './CategoryItem';
import { Category } from '../../types/types';
import { GripVertical } from 'lucide-react';

const CATEGORY_TYPE = 'CATEGORY';

interface SortableCategoryItemProps {
    category: Category;
    index: number;
    moveCategory: (dragIndex: number, hoverIndex: number) => void;
}

const SortableCategoryItem: React.FC<SortableCategoryItemProps> = ({ category, index, moveCategory }) => {
    const ref = useRef<HTMLDivElement>(null);

    // Define drop behavior
    const [, drop] = useDrop({
        accept: CATEGORY_TYPE,
        hover: (item: { index: number }, monitor) => {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;

            // Get the bounding rectangle of the hovered element
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) return;
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            // Only move when the mouse has crossed half of the item's height
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            // Perform the move
            moveCategory(dragIndex, hoverIndex);

            // Update the dragged item's index for future hovers
            item.index = hoverIndex;
        }
    });

    // Define drag behavior
    const [{ isDragging }, drag] = useDrag({
        type: CATEGORY_TYPE,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    // Connect the drag and drop refs
    drag(drop(ref));

    return (
        <article
            className="category"
            ref={ref}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <CategoryItem category={category} />
        </article>
    );
};

export default SortableCategoryItem;
