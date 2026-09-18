import {Component, inject, input, output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Course} from "../models/course.model";
import {MatDialog} from "@angular/material/dialog";
import { openEditCourseDialg } from '../edit-course-dialog/edit-course-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'courses-card-list',
    imports: [
        RouterLink,
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './courses-card-list.component.html',
    styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {
    courses = input<Course[]>();
    courseUpdated = output<Course>();
    coursesDeleted = output<string>();
    dialog = inject(MatDialog);

    async onEditCourse(course: Course) {
        const newCourse = await openEditCourseDialg(this.dialog, {
            mode: "update",
            title: "update existing course",
            course
        });
        this.courseUpdated.emit(newCourse);
        
    }

    onCourseDeleted(course: Course) {
        this.coursesDeleted.emit(course.id);
    }
 }


