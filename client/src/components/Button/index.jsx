
export default function Button({ children, type, onClick }) {
  return (
      <button onClick={() => onClick()} className={type}>
          {children}
    </button>
  )
}
