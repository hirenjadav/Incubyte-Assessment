import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should test add for empty string', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.add('')).toEqual(0);
  });

  it('should test add for single number', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.add('5')).toEqual(5);
  });

  it('should test add for two comma saperated numbers', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.add('5,12')).toEqual(17);
  });

  it('should test add for multiple comma saperated numbers', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.add('5,12,16,8')).toEqual(41);
  });

  it('should test add for \\n saperated numbers', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.add('5\n8,12')).toEqual(25);
  });

  it('should test add for multiple \\n saperated numbers', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.add('5\n8,12\n15')).toEqual(40);
  });

  it('should test add for different delimiters', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.add('//;5;8;12')).toEqual(25);
  });

  it('should test add for different delimiters with \\n', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.add('//;5;8\n12;15')).toEqual(40);
  });

  it('should test add for throwing error for negative numbers', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(() => app.add('5,3,-9,6,-12')).toThrowError('negative numbers not allowed -9, -12');
  });

  it('should test add for delimiter "-"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.add('//-5-8\n12-15')).toEqual(40);
  });

  it('should test add for throwing error for negative numbers having delimiter "-"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(() => app.add('//-5-3--9-6--12')).toThrowError('negative numbers not allowed -9, -12');
  });

  it('should test add for ignore number greater then 1000', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.add('5,6000,10,12')).toEqual(27);
  });

  it('should test add for delimiter with multiple characters', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.add('//[**]5**8**12**15')).toEqual(40);
  });

  it('should test add for multiple delimiter with multiple characters', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.add('//[*][++]5*8++12*15\n10')).toEqual(50);
  });

});
