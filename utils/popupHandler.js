// popupHandler.js
async function closeMoneyControlPopups(page) {
  async function tryClick(selector) {
    try {
      const element = await page.$(selector);
      if (element) {
        const isVisible = await page.evaluate(el => {
          const style = window.getComputedStyle(el);
          return style && style.display !== 'none' && style.visibility !== 'hidden' && el.offsetHeight > 0;
        }, element);

        if (isVisible) {
          await element.click();
          console.log(`Closed popup with selector: ${selector}`);
          await new Promise(resolve => setTimeout(resolve, 500));
          return true;
        }
      }
    } catch (error) {
      console.log(`Popup handling error for ${selector}:`, error.message);
    }
    return false;
  }

  const knownSelectors = ['#wzrk-cancel', '.modalClose.propopup', '.close.propopup'];
  const popupSelectors = ['.overlay-close', '.mfp-close', '.closeBtn', '.close', '.popupClose'];

  for (const selector of [...knownSelectors, ...popupSelectors]) {
    await tryClick(selector);
  }
}

module.exports = closeMoneyControlPopups;