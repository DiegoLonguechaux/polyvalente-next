export default function Footer() {
  return (
    <footer className="bg-primary-400 text-white p-6 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} La Polyvalente. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
