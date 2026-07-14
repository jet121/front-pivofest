import { useEffect, useRef, useState } from "react";
import { Button } from "@shared/ui";
import { getApiErrorMessage } from "@shared/api";
import { useAppSelector } from "@app/providers/store";
import { selectAuth } from "@entities/user";
import { getRequestTypes, sendRequest, type RequestType } from "./api";
import styles from "./Feedback.module.css";

export const Feedback = () => {
  const auth = useAppSelector(selectAuth);

  const [types, setTypes] = useState<RequestType[]>([]);
  const [typeId, setTypeId] = useState<number | null>(null);
  const [typeOpen, setTypeOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const typeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    getRequestTypes()
      .then((list) => {
        if (!active) return;
        setTypes(list);
        setTypeId(list[0]?.id ?? null);
      })
      .catch(() => {
        /* типы недоступны — оставляем пустой список */
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!typeOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setTypeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [typeOpen]);

  const selectedType = types.find((type) => type.id === typeId);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email.trim() || !message.trim() || typeId == null) {
      setError("Заполните тип, email и сообщение");
      return;
    }

    setSubmitting(true);
    try {
      await sendRequest({
        email: email.trim(),
        request: message.trim(),
        type_id: typeId,
        auth_key: auth?.auth_key,
        user_id: auth?.user_id,
        file,
      });
      setSuccess(true);
      setMessage("");
      setFile(null);
    } catch (e) {
      setError(getApiErrorMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] ?? null);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Обратная связь</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.select} ref={typeRef}>
          <button
            type="button"
            className={styles.row}
            onClick={() => setTypeOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={typeOpen}
          >
            <span className={styles.label}>Тип</span>
            <span className={styles.value}>
              {selectedType?.title ?? "—"}
              <span
                className={`${styles.chevron} ${typeOpen ? styles.chevronOpen : ""}`}
              />
            </span>
          </button>

          {typeOpen && types.length > 0 && (
            <ul className={styles.options} role="listbox">
              {types.map((type) => (
                <li key={type.id}>
                  <button
                    type="button"
                    className={`${styles.option} ${type.id === typeId ? styles.optionActive : ""}`}
                    onClick={() => {
                      setTypeId(type.id);
                      setTypeOpen(false);
                    }}
                  >
                    {type.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <label className={styles.row}>
          <span className={styles.label}>Email для ответа</span>
          <input
            className={styles.input}
            type="email"
            inputMode="email"
            placeholder="Ваш email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label className={styles.messageBlock}>
          <span className={styles.label}>Ваше сообщение</span>
          <textarea
            className={styles.textarea}
            placeholder="Сообщение"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>

        {error && <p className={styles.error}>{error}</p>}
        {success && (
          <p className={styles.success}>Сообщение отправлено. Спасибо!</p>
        )}

        <div className={styles.actions}>
          <label className={styles.attach}>
            <input
              type="file"
              accept="image/*,.pdf"
              className={styles.fileInput}
              onChange={handleFileChange}
            />
            <span className={styles.attachText}>
              {file?.name ?? "Прикрепить фото/чек"}
            </span>
          </label>

          <Button
            type="submit"
            variant="primary"
            className={styles.submit}
            disabled={submitting}
          >
            {submitting ? "Отправка…" : "Отправить"}
          </Button>
        </div>
      </form>
    </section>
  );
};
