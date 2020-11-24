;(async function () {
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

  const font = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`
  const main = document.createElement('div')
  main.id = 'piny'

  Object.assign(main.style, {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    zIndex: 99999,

    display: 'flex',
    alignItems: 'center',

    width: 'auto',
    height: 'auto',

    margin: 0,
    padding: '0.5rem 1rem',

    color: 'black',
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 0 1.5rem rgba(0, 0, 0, .1)',

    fontFamily: font,
    fontSize: '1rem',
    lineHeight: 1.5,

    transition: `all ${fade}ms`,
  })

  Object.assign(main.style, transition.out)

  const text = document.createElement('p')

  text.innerText = 'Added to Piny 🌲'

  Object.assign(text.style, {
    font: 'inherit',
    margin: 0,
    padding: 0,
  })

  main.appendChild(text)
  document.body.appendChild(main)
  appear(main)

  function appear(el) {
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
