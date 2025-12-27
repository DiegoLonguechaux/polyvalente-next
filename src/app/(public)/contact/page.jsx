import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-primary text-center mb-8">Contactez-nous</h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Une question ? Une suggestion ? N'hésitez pas à nous envoyer un message via le formulaire ci-dessous.
            </p>
            <ContactForm />
        </div>
    )
}