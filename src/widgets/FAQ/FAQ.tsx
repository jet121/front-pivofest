import { useId, useState } from "react";
import styles from "./FAQ.module.css";
import VectorIcon from "./_i/vector.svg?react";
import BubblesIcon from "./_i/bubbles.svg?react";
import PatternIcon from "@widgets/UserSection/_i/pattern.svg?react";

const faqItems = [
  {
    question: "Какие возрастные ограничения?",
    answer:
      "Участие в акции доступно лицам старше 18 лет. Сайт и продукция предназначены для совершеннолетних.",
  },
  {
    question: "Какие магазины участвуют в акции?",
    answer:
      "Актуальный список магазинов-участников размещён на сайте. Покупки должны быть совершены в точках, участвующих в акции.",
  },
  {
    question:
      "На какую сумму надо совершить покупку, обязательно ли на все брать продукцию Крафта?",
    answer:
      "Участвуют чеки от 700 руб. с хотя бы одной позицией продукции Крафт. Не обязательно покупать только продукцию завода — достаточно одной позиции Крафта в чеке.",
  },
  {
    question:
      "Какое пиво или лимонад мне купить, чтобы выиграть билет на фестиваль?",
    answer:
      "Участвует любая продукция пивоваренного завода Крафт из списка на сайте. Конкретный сорт не влияет на участие в розыгрыше.",
  },
  {
    question: "Как мне узнать выиграл ли я билет?",
    answer:
      "Результаты еженедельного розыгрыша публикуются в личном кабинете. Победители также получают уведомление.",
  },
  {
    question: "Если я выиграл, как мне получить билет?",
    answer:
      "Бесплатный билет станет доступен в личном кабинете после подтверждения победы в розыгрыше.",
  },
  {
    question: "Как мне купить билет со скидкой?",
    answer:
      "Отсканируйте QR-код на кассовом чеке и получите промокод на скидку 20% на билет в личном кабинете.",
  },
  {
    question: "Где смотреть полные условия акции?",
    answer:
      "Полные условия акции размещены в разделе «Условия акции» на сайте.",
  },
];

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FaqItem = ({ question, answer, isOpen, onToggle }: FaqItemProps) => {
  const contentId = useId();

  return (
    <li className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
      >
        <span className={styles.question}>{question}</span>
        <span
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
        />
      </button>

      <div
        id={contentId}
        className={`${styles.content} ${isOpen ? styles.contentOpen : ""}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.contentInner}>
          <p className={styles.answer}>{answer}</p>
        </div>
      </div>
    </li>
  );
};

export const FAQ = () => {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <VectorIcon />
      </div>

      <div className={styles.pattern}>
        <PatternIcon />
      </div>

      <div className={styles.container}>
        <h2>
          ВОПРОС — ОТВЕТ <BubblesIcon />
        </h2>

        <ul className={styles.list}>
          {faqItems.map((item, index) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={Boolean(openItems[index])}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
