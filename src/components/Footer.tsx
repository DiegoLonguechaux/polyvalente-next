export default function Footer() {
  return (
    <footer className="bg-primary text-white p-6 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Asso Polyvalente. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
