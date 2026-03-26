import { test, expect } from '@playwright/test';
import { toAppiumSelector } from '../src/selectors/appium';

test.describe('toAppiumSelector', () => {

  // accessibility id
  test('maps "accessibility id" to ~value', () => {
    expect(toAppiumSelector('accessibility id', 'Login', 'android')).toBe('~Login');
    expect(toAppiumSelector('accessibility id', 'MyButton', 'ios')).toBe('~MyButton');
  });

  // xpath
  test('maps "xpath" to the raw value (no prefix)', () => {
    expect(toAppiumSelector('xpath', '//android.widget.Button', 'android')).toBe('//android.widget.Button');
    expect(toAppiumSelector('xpath', '//XCUIElementTypeButton', 'ios')).toBe('//XCUIElementTypeButton');
  });

  // id
  test('maps "id" to #value', () => {
    expect(toAppiumSelector('id', 'submit-btn', 'android')).toBe('#submit-btn');
    expect(toAppiumSelector('id', 'email-field', 'ios')).toBe('#email-field');
  });

  // css
  test('maps "css" to css=value', () => {
    expect(toAppiumSelector('css', 'button.primary', 'android')).toBe('css=button.primary');
    expect(toAppiumSelector('css', 'input[type="text"]', 'ios')).toBe('css=input[type="text"]');
  });

  // uiautomator
  test('maps "uiautomator" to android=value', () => {
    expect(toAppiumSelector('uiautomator', 'new UiSelector().text("Submit")', 'android')).toBe(
      'android=new UiSelector().text("Submit")'
    );
  });

  // predicate
  test('maps "predicate" to -ios predicate string:value', () => {
    expect(toAppiumSelector('predicate', 'label == "Login"', 'ios')).toBe(
      '-ios predicate string:label == "Login"'
    );
  });

  // class chain
  test('maps "class chain" to -ios class chain:value', () => {
    expect(toAppiumSelector('class chain', '**/XCUIElementTypeButton', 'ios')).toBe(
      '-ios class chain:**/XCUIElementTypeButton'
    );
  });

  // class name
  test('maps "class name" to the raw value', () => {
    expect(toAppiumSelector('class name', 'android.widget.EditText', 'android')).toBe(
      'android.widget.EditText'
    );
    expect(toAppiumSelector('class name', 'XCUIElementTypeTextField', 'ios')).toBe(
      'XCUIElementTypeTextField'
    );
  });

  // text — android
  test('maps "text" for android to UiSelector text query', () => {
    expect(toAppiumSelector('text', 'Submit', 'android')).toBe(
      'android=new UiSelector().text("Submit")'
    );
  });

  // text — ios
  test('maps "text" for ios to -ios predicate string label', () => {
    expect(toAppiumSelector('text', 'Submit', 'ios')).toBe(
      '-ios predicate string:label == "Submit"'
    );
  });

  // text — other platform (neither android nor ios)
  test('maps "text" for unknown platform to raw value', () => {
    expect(toAppiumSelector('text', 'Submit', 'web')).toBe('Submit');
    expect(toAppiumSelector('text', 'Submit', 'windows')).toBe('Submit');
  });

  // default (unknown strategy)
  test('returns raw value for any unknown strategy', () => {
    expect(toAppiumSelector('nativeId', 'com.example.button', 'android')).toBe('com.example.button');
    expect(toAppiumSelector('custom', 'my-selector', 'ios')).toBe('my-selector');
    expect(toAppiumSelector('', 'fallback', 'android')).toBe('fallback');
  });
});
