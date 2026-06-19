import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  currentValue: string = '';
  previousValue: string = '';
  operator: string = '';

  appendNumber(value: string): void {
    this.currentValue += value;
  }

  appendDecimal(): void {
    if (this.currentValue.includes('.')) {
      return;
    }

    if (this.currentValue === '') {
      this.currentValue = '0.';
    } else {
      this.currentValue += '.'
    }
  }

  chooseOperator(op: string): void {
    if (this.currentValue === '' && this.previousValue === '') {
      return;
    }

    if (this.currentValue === '') {
      this.operator = op;
      return;
    }

    this.previousValue = this.currentValue;
    this.operator = op;
    this.currentValue = '';
  }

  calculate(): void {

    if (
      this.previousValue === '' ||
      this.currentValue === '' ||
      this.operator === ''
    ) {
      return;
    }

    const prev = parseFloat(this.previousValue);
    const current = parseFloat(this.currentValue);

    let result: number;

    switch (this.operator) {
      case '+':
        result = prev + current;
        break;

      case '-':
        result = prev - current;
        break;

      case '*':
        result = prev * current;
        break;

      case '/':
        if (current === 0) {
          this.currentValue = 'Cannot divide by zero';
          this.previousValue = '';
          this.operator = '';
          return;
        }
        result = prev / current;
        break;

        default:
          return;
    }

    this.currentValue = result.toString();
    this.previousValue = '';
    this.operator = '';
  }

  clear(): void {
    this.currentValue = '';
    this.previousValue = '';
    this.operator = '';
  }

  deleteLast(): void {
    this.currentValue = this.currentValue.slice(0, -1);
  }
}
