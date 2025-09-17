import { useState } from 'react'

export default function DateTimeButton({ type = 'date' }) {
  const [text, setText] = useState('')

  const showNow = () => {
    const d = new Date()
    if (type === 'time') {
      const t = d.toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      setText(t)
    } else {
      const date = d.toLocaleDateString('ja-JP')
      const weekday = d.toLocaleDateString('ja-JP', { weekday: 'short' })
      setText(`${date} (${weekday})`)
    }
  }

  const label = type === 'time' ? '現在時刻を表示' : '現在日付を表示'

  return (
    <div>
      <button type="button" onClick={showNow}>{label}</button>
      {text && <p>{text}</p>}
    </div>
  )
}
