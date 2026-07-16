import { createSignal } from 'solid-js'

function Page() {
  const [isChecked, setIsChecked] = createSignal(true)

  return (
    <>
      <h1>App: Vike Lite + Solid</h1>

      <input
        type="checkbox"
        class="checkbox"
        checked={isChecked()}
        onChange={(event) => setIsChecked(event.currentTarget.checked)}
      />

      <br />

      The checkbox is: {isChecked() ? 'checked' : 'unchecked'}
    </>
  )
}

export { Page }
