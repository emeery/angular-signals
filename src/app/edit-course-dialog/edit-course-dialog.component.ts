import {Component, effect, inject, signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../models/course.model";
import {EditCourseDialogData} from "./edit-course-dialog.data.model";
import {CoursesService} from "../services/courses.service";
import {LoadingIndicatorComponent} from "../loading/loading.component";
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {CourseCategoryComboboxComponent} from "../course-category-combobox/course-category-combobox.component";
import {CourseCategory} from "../models/course-category.model";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [
    LoadingIndicatorComponent,
    ReactiveFormsModule,
    CourseCategoryComboboxComponent
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent {  
  data: EditCourseDialogData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  fb = inject(FormBuilder);
  courseService = inject(CoursesService);

  form = this.fb.group({
      title: [''],
      longDescription: [''],
      category: [''],
      iconUrl: ['']
  });

  constructor() {
    this.form.patchValue({
      title: this.data.course?.title,
      longDescription: this.data.course?.longDescription,
      category: this.data.course?.category,
      iconUrl: this.data.course?.iconUrl
    })
  }

  async onSave() {
    const course = this.form.value as Partial<Course>;
    
    if(this.data.mode === 'update') {
      console.log('cour',course);
        this.saveCourse(this.data?.course!.id, course); // ! compilador aseguras que haya el objeto siempre existe
    }
  }

  async saveCourse(courseId: string, changes: Partial<Course>) {
    try {
      const updatedCourse = await this.courseService.editCourse(courseId, changes);
      console.log(updatedCourse);
      this.dialogRef.close(updatedCourse);
    } catch (error) {
      console.log('err', error);
    }
  }

  onClose() {
    this.dialogRef.close();
  }

}

export async function openEditCourseDialg(dialog: MatDialog, data: EditCourseDialogData) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.width = "400px";
  config.data = data;

  const close$ = dialog.open(EditCourseDialogComponent, config).afterClosed();
  return firstValueFrom(close$);
} 