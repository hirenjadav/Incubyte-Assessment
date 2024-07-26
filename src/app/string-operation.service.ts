import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringOperationService {

  constructor() { }

  add(numbers: string): number {
    if(!numbers) return 0;
    
    let delimiters: string[] = [','];
    if(numbers.startsWith('//')) {
      if(numbers[2] == '[') {
        delimiters = [];
        const lastIndex: number = numbers.lastIndexOf(']');
        let j: number = 3;
        while(j <= lastIndex) {
          const k: number = j;
          while(numbers[j] != ']') j++;
          delimiters.push(numbers.substring(k, j));
          j += 2;
        }
        numbers = numbers.substring(lastIndex + 1);
      } else {
        if(numbers[2] == '-') {
          numbers = numbers.replaceAll('-', delimiters[0]);
          numbers = numbers.replaceAll(`${delimiters[0]}${delimiters[0]}`, `${delimiters[0]}-`);
        }
        delimiters[0] = numbers[2];
        numbers = numbers.substring(3);
      }
    }

    numbers = numbers.replaceAll('\n', delimiters[0]);
    delimiters.forEach(x => {
      numbers = numbers.replaceAll(x, delimiters[0]);
    });

    const numberArr: number[] = numbers.split(delimiters[0]).map(x => parseInt(x));

    const negativeNumberArr: number[] = numberArr.filter(x => x < 0);

    if(negativeNumberArr.length) {
      throw new Error(`negative numbers not allowed ${negativeNumberArr.join(', ')}`);
    }

    const sum: number = numberArr.reduce((a, x) => {
      return (x < 0 || x > 1000) ? a : (a + x);
    }, 0);

    return sum;
  }
}
