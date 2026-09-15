import {Component, inject, input, output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Course} from "../models/course.model";
import {MatDialog} from "@angular/material/dialog";
import { openEditCourseDialg } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
    selector: 'courses-card-list',
    imports: [
        RouterLink
    ],
    templateUrl: './courses-card-list.component.html',
    styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {
    courses = input<Course[]>();
    dialog = inject(MatDialog);

    async onEdit(course: Course) {
        const newCourse = await openEditCourseDialg(this.dialog, {
            mode: "update",
            title: "update existing course",
            course
        });

        console.log('course edited', newCourse);
    }
}


