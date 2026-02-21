import { useState, useCallback, useRef } from 'react'
import { TextBlock } from '@/entities/text-node'
import type { TextNode } from '@/entities/text-node'
import styles from './Canvas.module.css'

export function Canvas() {
  const [nodes, setNodes] = useState<TextNode[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== canvasRef.current) return

    const id = crypto.randomUUID()
    setNodes(prev => [...prev, { id, x: e.clientX, y: e.clientY, text: '' }])
    setActiveId(id)
  }, [])

  const handleInput = useCallback((id: string, text: string) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, text } : n))
  }, [])

  const handleBlur = useCallback((id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id || n.text.trim() !== ''))
    if (activeId === id) setActiveId(null)
  }, [activeId])

  return (
    <div
      ref={canvasRef}
      onClick={handleCanvasClick}
      className={styles.canvas}
    >
      {nodes.map(node => (
        <TextBlock
          key={node.id}
          node={node}
          autoFocus={node.id === activeId}
          onInput={handleInput}
          onBlur={handleBlur}
          onFocus={setActiveId}
        />
      ))}
    </div>
  )
}