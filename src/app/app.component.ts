import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  add(numbers: string): number {
    if(numbers.length === 0) return 0;

    let delimiter: string = ',';
    if(numbers.startsWith('//')) {
      delimiter = numbers[2];
      numbers = numbers.substring(3);
    }

    numbers = numbers.replaceAll('\n', delimiter);
    const numberArr: string[] = numbers.split(delimiter);
    const sum: number = numberArr.reduce((a, x) => a + parseInt(x), 0);

    return sum;
  }
}
