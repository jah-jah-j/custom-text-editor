import { useRef } from 'react'
import type { TextNode } from '../model/types'
import styles from './TextBlock.module.css'

type TextBlockProps = {
  node: TextNode
  autoFocus: boolean
  onInput: (id: string, text: string) => void
  onBlur: (id: string) => void
  onFocus: (id: string) => void
}

export function TextBlock({ node, autoFocus, onInput, onBlur, onFocus }: TextBlockProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  return (
    <textarea
      ref={el => {
        ref.current = el

        if (autoFocus && el) el.focus()
      }}
      value={node.text}
      onChange={e => onInput(node.id, e.target.value)}
      onBlur={() => onBlur(node.id)}
      onFocus={() => onFocus(node.id)}
      className={styles.textBlock}
      style={{ left: node.x, top: node.y }}
      rows={1}
    />
  )
}