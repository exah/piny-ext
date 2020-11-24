browser.browserAction.onClicked.addListener(handleAction)

function handleAction(tab) {
  console.log('clicked!', { tab, browser })
  notification()
}

function notification() {
  browser.tabs.executeScript({
    file: './src/notification.js',
  })
}
