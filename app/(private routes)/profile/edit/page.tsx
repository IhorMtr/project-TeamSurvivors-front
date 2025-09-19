"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Gender = "boy" | "girl" | "unknown" | "";

interface OnboardingResponse {
  message: string;
  gender: Gender;
  dueDate: string;
  avatar: string | null;
}

export default function OnboardingPage() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [gender, setGender] = useState<Gender>("");
  const [dueDate, setDueDate] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (avatar) formData.append("avatar", avatar);
    formData.append("gender", gender);
    formData.append("dueDate", dueDate);

    try {
      const res = await axios.post<OnboardingResponse>(
        "/api/onboarding",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      router.push("/my-day");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert("Помилка: " + (err.response?.data?.error || err.message));
      } else if (err instanceof Error) {
        alert("Помилка: " + err.message);
      } else {
        alert("Сталася невідома помилка");
      }
    }
  };

  const isFormValid = gender !== "" && dueDate !== "";

  return (
    <div className="flex flex-col xl:flex-row w-full min-h-screen bg-white">
      {/* Левая колонка с формой */}
      <div className="flex flex-col justify-center items-center w-full xl:w-1/2 p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6 w-full max-w-sm md:max-w-md xl:max-w-md"
        >
          <h1 className="text-center text-2xl font-medium md:text-3xl xl:text-4xl">
            Давайте познайомимось ближче
          </h1>

          {/* Фото */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {/* Аватарка или иконка */}
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-4xl">📷</span>
              )}
            </div>
            <label className="mt-3">
              <span className="px-4 py-2 bg-gray-100 rounded-lg shadow text-sm cursor-pointer">
                Завантажити фото
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setAvatar(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          {/* Стать дитини */}
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
            className="w-full border rounded-lg p-3 text-gray-700"
          >
            <option value="">Оберіть стать</option>
            <option value="boy">Хлопчик</option>
            <option value="girl">Дівчинка</option>
            <option value="unknown">Ще не знаю</option>
          </select>

          {/* Дата пологів */}
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border rounded-lg p-3 text-gray-700"
          />

          <button
            type="submit"
            disabled={!isFormValid}
            className={`
              w-full rounded-full py-3 font-bold transition
              ${isFormValid ? "bg-pink-200 hover:bg-pink-300" : "bg-pink-100 cursor-not-allowed"}
            `}
          >
            Зберегти
          </button>
        </form>
      </div>

      {/* Правая колонка с картинкой паростка (только десктоп) */}
      <div className="hidden xl:flex xl:w-1/2 bg-white justify-center items-center p-12">
        <img
          src="/images/plant.png"
          alt="plant"
          className="w-full h-auto max-h-[700px] object-contain"
        />
      </div>
    </div>
  );
}
