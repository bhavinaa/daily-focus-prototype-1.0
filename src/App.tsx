import { useState } from 'react'

type Task = {
  id: number
  title: string
  category: 'Teaching' | 'Design' | 'Admin'
}

const tasks: Task[] = [
  { id: 1, title: 'Prepare class slides', category: 'Teaching' },
  { id: 2, title: 'Review Figma design', category: 'Design' },
  { id: 3, title: 'Send workshop reminder', category: 'Admin' },
  { id: 4, title: 'Plan the next lesson', category: 'Teaching' },
]

const initiallyComplete = new Set([2, 3])

function App() {
  const [completed, setCompleted] = useState<Set<number>>(initiallyComplete)
  const completeCount = completed.size

  const toggleTask = (id: number) => {
    setCompleted((current) => {
      const next = new Set(current)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const reset = () => setCompleted(new Set(initiallyComplete))

  return (
    <main className="stage">
      <section className="focus-card" aria-labelledby="welcome-heading">
        <span className="state-chip">DAILY FOCUS</span>
        <header>
          <h1 id="welcome-heading">Good morning, Bhavina</h1>
          <p>Thursday, 8 October</p>
        </header>

        <section className="progress-panel" aria-label={`Today's progress: ${completeCount} of 4`}>
          <div className="progress-label">
            <span>Today’s progress</span>
            <strong>{completeCount} of 4</strong>
          </div>
          <div className="track" aria-hidden="true">
            <div className="fill" style={{ width: `${completeCount * 25}%` }} />
          </div>
        </section>

        <section className="priorities" aria-labelledby="priorities-heading">
          <h2 id="priorities-heading">Your priorities</h2>
          <div className="task-list">
            {tasks.map((task) => {
              const isComplete = completed.has(task.id)
              return (
                <button
                  className={`task ${isComplete ? 'task--done' : ''}`}
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  aria-pressed={isComplete}
                >
                  <span className="check" aria-hidden="true">{isComplete && '✓'}</span>
                  <span className="task-copy">
                    <span className="task-title">{task.title}</span>
                    <span className={`tag tag--${task.category.toLowerCase()}`}>{task.category}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <button className="reset" onClick={reset}>Reset demo</button>
      </section>
    </main>
  )
}

export default App
