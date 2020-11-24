browser.browserAction.onClicked.addListener(handleAction)

async function handleAction() {
  let { token } = await browser.storage.local.get()

  if (token == null) {
    await browser.runtime.openOptionsPage()
  } else {
    notification()
  }
}

function notification() {
  browser.tabs.executeScript({
    file: './src/browser-polyfill.js',
  })

  browser.tabs.executeScript({
    file: './src/notification.js',
  })
}
