export interface Selector {
  [key: string]: string;
}

export interface Element {
  elementName: string;
  selector: Selector;
}

export interface PageObject {
  name: string;
  platform?: string;
  elements: Element[];
}

export interface PageObjectSchema {
  pages: PageObject[];
}

export interface Page {
  waitForSelector(selector: string, options?: any): Promise<any>;
  locator(selector: string): any;
}