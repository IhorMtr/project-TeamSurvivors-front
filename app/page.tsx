import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main>
      <h1>Головна сторінка Leleka</h1>
      <p>
        Тут буде дашборд, а поки що можно перейти до{" "}
        <Link href="/journey/16" className="text-blue-500 underline">
          Подорожі
        </Link>
      </p>
    </main>
  );
}