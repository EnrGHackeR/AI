import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { TypewriterHeading } from "./typewriter-heading"

const faqs = [
  {
    question: "How do I post a listing on Homie?",
    answer:
      "It's very simple! Create an account, click 'Post a listing', add photos and a description of your property, set the price and availability. Your listing will be live within minutes after verification.",
  },
  {
    question: "What are the fees for owners?",
    answer:
      "Homie charges a 3% commission only when a rental is confirmed. No listing fees, no mandatory subscription. The Pro plan at $49/month reduces the commission to 2% for multi-property owners.",
  },
  {
    question: "How are tenants verified?",
    answer:
      "Each tenant must provide an ID and proof of income. We verify these documents and assign a trust score. Owners can view the complete profile before accepting a request.",
  },
  {
    question: "Are payments secure?",
    answer:
      "Yes, all payments go through our secure platform. Funds are held until check-in confirmation, then released to the owner. In case of disputes, our team intervenes to find a solution.",
  },
  {
    question: "What does the damage insurance cover?",
    answer:
      "Our included insurance covers material damage up to $5,000 per rental. It protects owners against accidental damage. A $200 deductible applies in case of a claim.",
  },
  {
    question: "Can I cancel a reservation?",
    answer:
      "Cancellation conditions are set by each owner (flexible, moderate, or strict). Refunds are calculated based on these conditions. Force majeure cases may qualify for a full refund.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-32 px-6 pb-80">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <TypewriterHeading
            text="Frequently asked questions"
            tag="h2"
            className="text-4xl md:text-5xl font-normal mb-6 text-balance font-serif text-[#36B1C7]"
            typeSpeed={35}
          />
          <p className="text-[#E8D8C3]/70 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about Homie. Have a question not listed? Contact our support.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3 py-0 my-0">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-xl px-6 card-gradient data-[state=open]:border-[#36B1C7]/30"
            >
              <AccordionTrigger className="text-left text-base font-medium text-[#FBF6EE] hover:no-underline hover:text-[#D3AF37] py-5 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#E8D8C3]/70 pb-5 leading-relaxed text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
