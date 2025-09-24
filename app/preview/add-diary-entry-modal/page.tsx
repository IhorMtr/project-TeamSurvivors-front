"use client";

import { useState } from "react";
import AddDiaryEntryModal from "@/components/Diary/AddDiaryEntryModal/AddDiaryEntryModal";

export default function AddDiaryEntryModalPreviewPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [mode, setMode] = useState<"create" | "edit">("create");

  const openCreate = () => {
    setMode("create");
    setIsOpen(true);
  };

  const openEdit = () => {
    setMode("edit");
    setIsOpen(true);
  };

  return (
    <div style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <h1>Перегляд AddDiaryEntryModal</h1>
      <p>
        Ця сторінка лише для швидкого перегляду модального вікна. Кнопки нижче відкривають модалку у
        режимі створення або редагування. Після тесту просто видалiть директорію <code>app/preview</code>.
      </p>
      <div style={{ display: "flex", gap: "12px" }}>
        <button type="button" onClick={openCreate}>
          Відкрити (створення)
        </button>
        <button type="button" onClick={openEdit}>
          Відкрити (редагування)
        </button>
        <button type="button" onClick={() => setIsOpen(false)}>
          Закрити
        </button>
      </div>

      <AddDiaryEntryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode={mode}
        formProps={{
          mode,
          initialValues:
            mode === "edit"
              ? {
                  id: "demo-1",
                  title: "Демо запис",
                  categories: ["joy", "calm"],
                  text: "Це попередньо заповнений запис для режиму редагування.",
                }
              : undefined,
          notify: (type: "success" | "error", message: string) =>
            console.log(`[${type}]`, message),
          onSuccess: (data: unknown) => {
            console.log("Успішно збережено", data);
            setIsOpen(false);
          },
          onError: (error: unknown) => {
            console.error("Помилка збереження", error);
          },
          apiBase: "",
          apiPath: "/api/mock/diary",
        }}
      />
    </div>
  );
}
