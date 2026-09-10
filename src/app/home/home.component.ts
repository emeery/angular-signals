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

    beginnerCourses = computed(() => {
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
        effect(() => {
            console.log('courses',this.beginnerCourses());
        })
    }

    async loadCourses() {
        try{
            console.log('helele');
            const courses = await this.coursesService.loadAllCourses();
            this.#courses.set(courses.sort(sortCoursesBySeqNo));
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    }
}
