;(async function () {
  const states = {
    pending: 'Loading...',
    ready: 'Added to Piny 🌲',
    failure: 'Failed to save',
  }

  const transition = {
    out: {
      opacity: 0,
      transform: 'translateY(-0.75rem)',
    },
    in: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  }

  const fade = 300
  const prev = document.getElementById('piny')

  if (prev) {
    disappear(prev)
    return
  }

  const main = createMain()
  const text = createText()

  Object.assign(main.style, transition.out)

  main.id = 'piny'
  main.appendChild(text)

  appear(main)

  try {
    text.innerText = states.pending
    const { token } = await browser.storage.local.get()

    console.log({ token })
    text.innerText = states.ready
  } catch (error) {
    text.innerText = states.failure
    console.error(error)
  }

  function createBox() {
    const element = document.createElement('div')

    Object.assign(element.style, {
      boxSizing: 'border-box',
      display: 'block',

      margin: 0,
      padding: 0,

      width: 'auto',
      height: 'auto',

      fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,

      color: 'inherit',
      background: 'none',
      border: 'none',
    })

    return element
  }

  function createMain() {
    const element = createBox()

    Object.assign(element.style, {
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      zIndex: 99999,

      display: 'flex',
      alignItems: 'center',

      padding: '0.5rem 1rem',

      color: 'black',
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 0 1.5rem rgba(0, 0, 0, .1)',

      transition: `all ${fade}ms`,
    })

    return element
  }

  function createText() {
    const element = document.createElement('p')

    Object.assign(element.style, {
      font: 'inherit',
      color: 'inherit',
      margin: 0,
      padding: 0,
    })

    return element
  }

  function appear(el) {
    document.body.appendChild(el)

    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      if (rect.height === 0 && rect.width === 0) {
        return appear(el)
      }

      Object.assign(el.style, transition.in)
    })
  }

  function disappear(el) {
    requestAnimationFrame(() => {
      Object.assign(el.style, transition.out)
      setTimeout(() => el.remove(), fade)
    })
  }
})()
