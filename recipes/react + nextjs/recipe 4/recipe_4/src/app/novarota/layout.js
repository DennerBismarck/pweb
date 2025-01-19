export default function RootLayout({ children }) {
  console.log("montando layout");

  return (
    <html lang="en">
      <body>
        <Home />
        {children}
      </body>
    </html>
  );
}

export function Home() {
    return (
      <div>
        <div>Menu do Doutor no layout de subdiretório</div>
        <div>
          <h1>Eh o Doutor</h1>
        </div>
      </div>
    );
  }
  