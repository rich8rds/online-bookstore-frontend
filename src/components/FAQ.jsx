import { faqData } from '../faqData';
import FAQPage from '../components/page/FAQPage';

const FAQ = () => {
  const paymentQuestions = faqData.filter(x => x.questionType === 'payment')
  const faqs = faqData.filter(x => x.questionType === 'faq')

  return (
    <section className="faq-section">
      <FAQPage data={faqs} title={"FREQUENTLY ASKED QUESTIONS"} />
      <FAQPage data={paymentQuestions} title={"PAYMENT QUESTIONS"} />
    </section>

  );
};

export default FAQ;