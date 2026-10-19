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
    
      // required garantiza que la instancia estará disponible sin usar afterViewInit 
    searchInput = viewChild.required<ElementRef>('search');

    async onSearch() {
        const query = this.searchInput()?.nativeElement.value;
        const results = await this.lessonService.loadLessons({query});
        this.lessons.set(results);
    }

    onLessonSelected(lesson: Lesson) {
        console.log('lessn', lesson);
        this.mode.set("detail");
        this.selectedLesson.set(lesson);
    }

    onCancel() {
        this.mode.set("master")
    }
}
