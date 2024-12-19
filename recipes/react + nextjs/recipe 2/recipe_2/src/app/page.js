// app/page.js

export function Header() {
  return (
      <header>
          <h2>Bem-vindo ao App do Doutor</h2>
      </header>
  );
}

export function Footer() {
  return (
      <footer>
          <p>© 2024 Menu do Doutor - Todos os direitos reservados</p>
      </footer>
  );
}

export default function Home() {
  return (
      <div>
          <div>Menu do Doutor</div>
          <div>
              <h1>Eh o Doutor</h1>
          </div>
      </div>
  );
}
