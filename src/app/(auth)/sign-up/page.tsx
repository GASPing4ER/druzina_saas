import { signup } from "./actions";

export default function SignUpPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="firstName">Ime:</label>
      <input id="firstName" name="firstName" type="text" required />
      <label htmlFor="lastName">Priimek:</label>
      <input id="lastName" name="lastName" type="text" required />
      <label htmlFor="password">Geslo:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={signup}>Registriraj se</button>
    </form>
  );
}
