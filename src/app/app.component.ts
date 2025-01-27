import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Model, ModelFactory } from 'ngx-model';

@Component({
  selector: 'nme-root',
  template: `
    <div>
      <h1>Angular ngx-model example</h1>
      <p>
        This is a minimal example of using ngx model
        in a Angular 6 project generated by the Angular CLI
      </p>
      <ul>
        <li>import <code>NgxModelModule</code> in <code>AppModule</code></li>
        <li>create model and use instance in <code>AppComponent</code></li>
        <li>
          check out <a href="https://github.com/tomastrajan/ngx-model" target="_blank">GitHub repo</a>
          and a <a href="https://tomastrajan.github.io/angular-model-pattern-example#/about">DOCS</a> website for more information
        </li>
      </ul>
      <h2>Example</h2>
      <div>
        <input type="text" (keyup)="setName($event.target.value)" [value]="(person$ | async).name">
        <p>Hello, {{(person$ | async).name}}! </p>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  private model: Model<Person>;

  person$: Observable<Person>;

  constructor(private modelFactory: ModelFactory<Person>) {
    this.model = this.modelFactory.create({ name: 'Tomas Trajan'});
    this.person$ = this.model.data$;
  }

  setName(name: string) {
    // retrieve raw model data
    const person = this.model.get();

    // mutate model data
    person.name = name;

    // set new model data (after mutation)
    this.model.set(person);
  }
}

export interface Person {
  name: string;
}
