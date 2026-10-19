import {Component, contentChild, contentChildren, effect, ElementRef, input, model} from '@angular/core';
import {CourseCategory} from "../models/course-category.model";

@Component({
  selector: 'course-category-combobox',
  standalone: true,
  imports: [],
  templateUrl: './course-category-combobox.component.html',
  styleUrl: './course-category-combobox.component.scss'
})
export class CourseCategoryComboboxComponent {
  //label = input.required<string>();
  value = model.required<CourseCategory>();
  // title = contentChild<ElementRef>("title"); // un referencia
  titles = contentChildren<ElementRef>("title") // todas las referencias 

  constructor() {
    effect(()=> {
      console.log('title',this.titles());
    })
  }
  
  onChangeCategory(value: string) {
    console.log('c',value);
    this.value.set(value as CourseCategory);
    
  }
}
