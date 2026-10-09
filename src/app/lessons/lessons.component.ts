import {Component, ElementRef, inject, signal, ViewChild, viewChild} from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Lesson} from "../models/lesson.model";
import {LessonDetailComponent} from "./lesson-detail/lesson-detail.component";

@Component({
    selector: 'lessons',
    imports: [
        LessonDetailComponent
    ],
    templateUrl: './lessons.component.html',
    styleUrl: './lessons.component.scss'
})
export class LessonsComponent {

    mode = signal<"master" | "detail">("master");
    lessons = signal<Lesson[]>([]);
    selectedLesson = signal<Lesson | null>(null);
    lessonService = inject(LessonsService);
    
      // required - garantiza que la instancia estará disponible sin usar afterViewInit 
    searchInput = viewChild.required<ElementRef>('search');

    onSearch() {
        const query = this.searchInput()?.nativeElement.value;
        console.log('query', query);
    }
}
