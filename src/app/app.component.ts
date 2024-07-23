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
    // return 0 when numbers list is empty
    if(!numbers) return 0;
    
    let delimiters: string[] = [','];
    if(numbers.startsWith('//')) {
      
      // This check is when multiple delimiter having multiple characters
      if(numbers[2] == '[') {
        delimiters = [];

        const lastIndex: number = numbers.lastIndexOf(']');
        
        // To create list of delimiters
        let j: number = 3;
        while(j <= lastIndex) {
          const k: number = j;
          while(numbers[j] != ']') j++;
          delimiters.push(numbers.substring(k, j));
          j += 2;
        }
        
        // To get rest of number after removing delimiters declartions
        numbers = numbers.substring(lastIndex + 1);
      } else {
        
        // This check is when delimiter is '-' then we need to separate it from negative numbers.
        if(numbers[2] == '-') {
          numbers = numbers.replaceAll('-', delimiters[0]);
          numbers = numbers.replaceAll(`${delimiters[0]}${delimiters[0]}`, `${delimiters[0]}-`);
        
        }
        
        // To set different delimiter
        delimiters[0] = numbers[2];

        // To get rest of number after removing delimiters declartions
        numbers = numbers.substring(3);
      }
    }

    // To replce \n with delimiters.
    numbers = numbers.replaceAll('\n', delimiters[0]);
    
    delimiters.forEach(x => {
      numbers = numbers.replaceAll(x, delimiters[0]);
    });

    const numberArr: string[] = numbers.split(delimiters[0]);
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
