'use client';
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "../../../../lib/store/authStore";
import { confirmGoogleOAuth } from "@/lib/api/auth";
import { userApiService } from "@/lib/api/userApi";
import { toast } from "react-hot-toast";

export default function ConfirmGoogleAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      router.push("/auth/login");
      return;
    }

    const loginWithGoogle = async () => {
      try {
        await confirmGoogleOAuth(code);        // бекенд ставить куку
        const user = await userApiService.getCurrentUser(); // юзер вже авторизований
        setUser(user);                          // зберігаємо в Zustand
        toast.success("Вхід через Google успішний!");
        router.push("/profile/edit");          // редірект на профіль
      } catch (err) {
        console.error(err);
        toast.error("Помилка входу через Google");
        router.push("/auth/login");            // тільки якщо справді помилка
      }
    };

    loginWithGoogle();
  }, [searchParams, setUser, router]);

  return <p>Зачекайте, підтверджуємо вхід...</p>;
}
