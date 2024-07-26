import { TestBed } from '@angular/core/testing';

import { StringOperationService } from './string-operation.service';

describe('StringOperationService', () => {
  let service: StringOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test add for empty string', () => {
    service = TestBed.inject(StringOperationService);
    expect(service.add('')).toEqual(0);
  });

  it('should test add for single number', () => {
    service = TestBed.inject(StringOperationService);
    expect(service.add('5')).toEqual(5);
  });

  it('should test add for two comma saperated numbers', () => {
    service = TestBed.inject(StringOperationService);
    expect(service.add('5,12')).toEqual(17);
  });

  it('should test add for multiple comma saperated numbers', () => {
    service = TestBed.inject(StringOperationService);
    expect(service.add('5,12,16,8')).toEqual(41);
  });

  it('should test add for \\n saperated numbers', () => {
    service = TestBed.inject(StringOperationService);
    expect(service.add('5\n8,12')).toEqual(25);
  });

  it('should test add for multiple \\n saperated numbers', () => {
    service = TestBed.inject(StringOperationService);
    expect(service.add('5\n8,12\n15')).toEqual(40);
  });

  it('should test add for different delimiters', () => {
    service = TestBed.inject(StringOperationService);
    expect(service.add('//;5;8;12')).toEqual(25);
  });

  it('should test add for different delimiters with \\n', () => {
    service = TestBed.inject(StringOperationService);
    expect(service.add('//;5;8\n12;15')).toEqual(40);
  });

  it('should test add for throwing error for negative numbers', () => {
    service = TestBed.inject(StringOperationService);
    expect(() => service.add('5,3,-9,6,-12')).toThrowError('negative numbers not allowed -9, -12');
  });

  it('should test add for delimiter "-"', () => {
    service = TestBed.inject(StringOperationService);
    expect(service.add('//-5-8\n12-15')).toEqual(40);
  });

  it('should test add for throwing error for negative numbers having delimiter "-"', () => {
    service = TestBed.inject(StringOperationService);
    expect(() => service.add('//-5-3--9-6--12')).toThrowError('negative numbers not allowed -9, -12');
  });

  it('should test add for ignore number greater then 1000', () => {
    service = TestBed.inject(StringOperationService);
    expect(service.add('5,6000,10,12')).toEqual(27);
  });

  it('should test add for delimiter with multiple characters', () => {
    service = TestBed.inject(StringOperationService);
    expect(service.add('//[**]5**8**12**15')).toEqual(40);
  });

  it('should test add for multiple delimiter with multiple characters', () => {
    service = TestBed.inject(StringOperationService);
    expect(service.add('//[*][++]5*8++12*15\n10')).toEqual(50);
  });
});
