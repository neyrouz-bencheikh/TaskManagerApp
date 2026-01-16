export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button className="btn" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
