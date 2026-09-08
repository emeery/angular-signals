import {Component, computed, inject, signal} from "@angular/core";
import {CoursesServiceWithFetch} from "../services/courses-fetch.service"
import {Course } from "../models/course.model";
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
    courses = signal<Course[]>([]);
    coursesService = inject(CoursesServiceWithFetch);

    constructor() {
        this.loadCourses().then(() => {
            console.log('Courses loaded successfully', this.courses());
        });
    }

    async loadCourses() {
        try{
            console.log('helele');
            const courses = await this.coursesService.loadAllCourses();
            this.courses.set(courses);
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    }
}
