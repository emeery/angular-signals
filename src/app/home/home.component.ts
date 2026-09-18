import {Component, computed, inject, signal, effect} from "@angular/core";
import {CoursesService} from "../services/courses.service"
import {Course, sortCoursesBySeqNo } from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";


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
    
    beginnerCourses = computed(() => { // computed - transformar datos y filtrar arreglos
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
        } catch (error) {
            console.error('Error loading courses:', error);
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
            console.log('courseid', courseId);
            const courses = this.#courses();
            console.log(courses);
            const newCourses = courses.filter(course => course.id !== courseId);
            console.log('newCours', newCourses);
            this.#courses.set(newCourses);
        } catch (err) {
            console.error(err);
            alert('error deleting course')
        }
    }

}
