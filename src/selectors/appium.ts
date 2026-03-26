/**
 * Converts a raw selector strategy/value pair from ElementRepository.getSelectorRaw()
 * into a WebdriverIO-compatible selector string for Appium.
 */
export function toAppiumSelector(strategy: string, value: string, platform: string): string {
  switch (strategy) {
    case 'accessibility id':
      return `~${value}`;
    case 'xpath':
      return value;
    case 'id':
      return `#${value}`;
    case 'css':
      return `css=${value}`;
    case 'uiautomator':
      return `android=${value}`;
    case 'predicate':
      return `-ios predicate string:${value}`;
    case 'class chain':
      return `-ios class chain:${value}`;
    case 'class name':
      return value;
    case 'text':
      if (platform === 'android') return `android=new UiSelector().text("${value}")`;
      if (platform === 'ios') return `-ios predicate string:label == "${value}"`;
      return value;
    default:
      return value;
  }
}
