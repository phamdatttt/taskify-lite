export default function SkeletonList() {
  return (
    <ul className="todo-list">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="todo">
          <div className="toggle skeleton-box" />
          <div className="label skeleton-box" style={{ width: "60%" }} />
          <div className="badge skeleton-box" style={{ width: 80 }} />
        </li>
      ))}
    </ul>
  );
}
