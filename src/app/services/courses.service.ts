import {inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";
import {Course} from "../models/course.model";
import {GetCoursesResponse} from "../models/get-courses.response";


@Injectable({
  providedIn: "root"
})
export class CoursesService {
  http = inject(HttpClient);
  env = environment

  async loadAllCourses(): Promise<Course[]> {
    const courses$ = await this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);
    const response = await firstValueFrom(courses$);
    return response.courses;
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    const response = await fetch(`${this.env.apiRoot}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
      });

      return await response.json();
    };

  async saveCourse(courseId: string, changes: Partial<Course>): Promise<Course> {
    const response = await fetch(`${this.env.apiRoot}/courses/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changes)
    });

    return await response.json();
  }

  async deleteCourse(courseId: string): Promise<void> {
    await fetch(`${this.env.apiRoot}/courses/${courseId}`, {
      method: 'DELETE'
    });
  }
}
  
