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

      // This check is when delimiter is '-' then we need to separate it from negative numbers.
      if(numbers[2] == '-') {
        numbers = numbers.replaceAll('-', delimiter);
        numbers = numbers.replaceAll(`${delimiter}${delimiter}`, `${delimiter}-`);
      }
      
      // To extract delimiter
      delimiter = numbers[2];
      numbers = numbers.substring(3);
    }

    numbers = numbers.replaceAll('\n', delimiter);
    
    const numberArr: string[] = numbers.split(delimiter);
    const negativeNumberArr: number[] = [];
    
    const sum: number = numberArr.reduce((a, x) => {
      const currNum: number = parseInt(x);
      
      if(currNum < 0) {
        negativeNumberArr.push(currNum);
      } else if(currNum > 1000) {
        return a; // Handled test case from TDD-KATA-1 (Case 6: Ignore number greater then 1000)
      }

      return a + currNum;
    }, 0);

    if(negativeNumberArr.length) {
      let errorMessage: string = 'negative numbers not allowed ';
      negativeNumberArr.forEach((x, i) => {
        if(i != 0)
          errorMessage += ', ';
        
        errorMessage += x;
      })
      throw new Error(errorMessage);
    }

    return sum;
  }
}
