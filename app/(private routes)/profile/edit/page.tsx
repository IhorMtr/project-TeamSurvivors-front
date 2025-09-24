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
    <div className="flex xl:flex-row flex-col w-full min-h-screen bg-[#fafafd]">
      {/* Левая колонка: карточка формы */}
      <div className="flex flex-col items-center justify-center w-full xl:w-1/2 min-h-screen">
        <div className="border-2 border-dotted border-blue-200 rounded-xl bg-white p-10 w-full max-w-[410px] mx-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6"
          >
            <h1 className="text-center text-[32px] md:text-4xl font-normal leading-tight mb-2">
              Давайте<br />познайомимось<br />ближче
            </h1>
            {/* Фото */}
            <div className="flex flex-col items-center">
              <div className="w-[120px] h-[120px] rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg width="48" height="48" fill="none">
                    <rect width="48" height="48" rx="24" fill="#E5E7EB"/>
                    <path d="M24 28c-2.5 0-7 1.27-7 3.8V33h14v-1.2C31 29.27 26.5 28 24 28ZM24 25c1.96 0 3.55-1.59 3.55-3.55 0-1.96-1.59-3.55-3.55-3.55-1.96 0-3.55 1.59-3.55 3.55 0 1.96 1.59 3.55 3.55 3.55Z" fill="#BDBDBD"/>
                  </svg>
                )}
              </div>
              <label className="mt-3">
                <span className="px-5 py-2 bg-gray-100 rounded-xl text-[#909090] text-base font-medium cursor-pointer">
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
              className="w-full border border-gray-200 rounded-lg py-3 px-4 text-gray-900 bg-[#fafafd] appearance-none"
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
              className="w-full border border-gray-200 rounded-lg py-3 px-4 text-gray-900 bg-[#fafafd]"
            />

            <button
              type="submit"
              disabled={!isFormValid}
              className={`
                w-full rounded-full py-3 font-bold transition text-lg
                ${isFormValid ? "bg-pink-200 hover:bg-pink-300 text-gray-800" : "bg-pink-100 text-gray-400 cursor-not-allowed"}
              `}
            >
              Зберегти
            </button>
          </form>
        </div>
      </div>

      {/* Правая колонка: картинка ростка, только на xl */}
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
