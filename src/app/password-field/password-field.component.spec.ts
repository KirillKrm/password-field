import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFieldComponent } from './password-field.component';
import { PasswordStrength } from '../types';

describe('PasswordFieldComponent', () => {
  let component: PasswordFieldComponent;
  let fixture: ComponentFixture<PasswordFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return "empty" if password strength is EMPTY', () => {
    component.passwordStrength = PasswordStrength.EMPTY;
    expect(component.getPasswordStrengthNameclass(0)).toEqual('empty');
    expect(component.getPasswordStrengthNameclass(1)).toEqual('empty');
    expect(component.getPasswordStrengthNameclass(2)).toEqual('empty');
  });

  it('should return "bad" if password strength is SHORT', () => {
    component.passwordStrength = PasswordStrength.SHORT;
    expect(component.getPasswordStrengthNameclass(0)).toEqual('bad');
    expect(component.getPasswordStrengthNameclass(1)).toEqual('bad');
    expect(component.getPasswordStrengthNameclass(2)).toEqual('bad');
  });

  it('should return "bad" if password strength is EASY', () => {
    component.passwordStrength = PasswordStrength.EASY;
    expect(component.getPasswordStrengthNameclass(0)).toEqual('bad');
    expect(component.getPasswordStrengthNameclass(1)).toEqual('empty');
    expect(component.getPasswordStrengthNameclass(2)).toEqual('empty');
  });

  it('should return "mediocre" if password strength is MEDIUM', () => {
    component.passwordStrength = PasswordStrength.MEDIUM;
    expect(component.getPasswordStrengthNameclass(0)).toEqual('mediocre');
    expect(component.getPasswordStrengthNameclass(1)).toEqual('mediocre');
    expect(component.getPasswordStrengthNameclass(2)).toEqual('empty');
  });

  it('should return "good" if password strength is STRONG', () => {
    component.passwordStrength = PasswordStrength.STRONG;
    expect(component.getPasswordStrengthNameclass(0)).toEqual('good');
    expect(component.getPasswordStrengthNameclass(1)).toEqual('good');
    expect(component.getPasswordStrengthNameclass(2)).toEqual('good');
  });
});
