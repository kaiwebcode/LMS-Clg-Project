import { DndContext, rectIntersection } from "@dnd-kit/core";


export function CourseStructure() {
    return (
        <DndContext collisionDetection={rectIntersection} >
                
        </DndContext>
    )

}