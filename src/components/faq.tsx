import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question:
      "How accurate are SocialyticAI's insights without direct account access?",
    answer:
      "SocialyticAI's advanced AI algorithms are designed to provide highly accurate insights based on publicly available data. While we don't have direct account access, our machine learning models are trained on vast datasets, enabling us to deliver reliable trends, predictions, and recommendations for Instagram strategies.",
  },
  {
    question: "What kind of insights can I expect from SocialyticAI?",
    answer:
      "Our platform provides comprehensive analytics including engagement rates, content performance, trend predictions, sentiment analysis, and competitor benchmarking. All insights are derived from public data and AI-driven analysis.",
  },
  {
    question: "How often is the data updated in SocialyticAI?",
    answer:
      "Our platform updates data daily through a custom cron job. This ensures that you always have access to the most recent insights and trends based on the latest public Instagram data.",
  },
  {
    question: "What types of Instagram data can SocialyticAI analyze?",
    answer:
      "SocialyticAI can analyze a wide range of public Instagram data, including posts, hashtags, and engagement metrics from any public account or trend. This allows for comprehensive insights without requiring access to specific accounts.",
  },
  {
    question: "What kind of recommendations does SocialyticAI provide?",
    answer:
      "SocialyticAI provides AI-powered recommendations on content type, posting times, trending hashtags, and engagement strategies. These suggestions are based on analyzed public data and industry trends.",
  },
  {
    question: "How does SocialyticAI ensure data privacy and security?",
    answer:
      "SocialyticAI prioritizes data privacy and security. We only analyze publicly available data and do not store personal information. Our platform uses advanced encryption and follows strict data protection protocols to ensure the confidentiality of your analysis requests and results.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
