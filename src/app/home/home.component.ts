import {Component, computed, inject, signal, effect} from "@angular/core";
import {CoursesService} from "../services/courses.service"
import {Course, sortCoursesBySeqNo } from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import { MatDialog } from "@angular/material/dialog";
import { openEditCourseDialg } from "../edit-course-dialog/edit-course-dialog.component";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";


@Component({
    selector: 'home',
    imports: [
        MatTabGroup,
        MatTab,
        CoursesCardListComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    #courses = signal<Course[]>([]);
    coursesService = inject(CoursesService);
    messageService = inject(MessagesService);
    dialog = inject(MatDialog);
    
    beginnerCourses = computed(() => { // transformar datos y filtrar arreglos
        const courses = this.#courses();
        return courses.filter(course => course.category === 'BEGINNER');
    })

    advancedCourses = computed(() => {
        const courses = this.#courses();
        return courses.filter(course => course.category === 'ADVANCED');
    })

    constructor() {
        this.loadCourses().then(() => {
            console.log('Courses loaded successfully', this.#courses());
        });
        // effect(() => {
        //     console.log('courses',this.beginnerCourses());
        // })
    }

    async loadCourses() {
        try{
            console.log('helele');
            const courses = await this.coursesService.loadCourses();
            this.#courses.set(courses.sort(sortCoursesBySeqNo));
        } catch (err) {
            this.messageService.showMessage("error loading courses", "error")
            console.error('Error loading courses:', err);
        } 
    }

    onCourseUpdated(updateCourse: Course) { // vuelve a renderizar el item actualizado 
        console.log('upd cours',updateCourse  );
        const courses = this.#courses();
        const newCourses = courses.map(course => (
            course.id === updateCourse.id ? updateCourse : course));
        this.#courses.set(newCourses);
    }

    async onCourseDeleted(courseId: string) {
        try {
            await this.coursesService.deleteCourse(courseId);
            const courses = this.#courses();
            const newCourses = courses.filter(course => course.id !== courseId);
            this.#courses.set(newCourses);
        } catch (err) {
            console.error(err);
            alert('error deleting course')
        }
    }

    async onAddCourse() {
        const newCourse = await openEditCourseDialg(
            this.dialog,
            {
                mode: "create",
                title: "create new course"
            }
        );
        const newCourses = [
            ...this.#courses(),
            newCourse
        ];
        this.#courses.set(newCourses);
    }

}
