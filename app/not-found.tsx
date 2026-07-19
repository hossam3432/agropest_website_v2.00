import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-agri-mist px-6 py-20 text-center">
      <div className="container-shell max-w-2xl">
        <p className="eyebrow">Page not found</p>
        <h1 className="section-title mt-3">The page you are looking for is not available.</h1>
        <p className="section-copy mx-auto mt-4">
          يرجى العودة إلى الصفحة الرئيسية أو تصفح المنتجات من جديد.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="btn-primary" href="/en">
            English Home
          </Link>
          <Link className="btn-secondary" href="/ar" dir="rtl">
            الرئيسية العربية
          </Link>
        </div>
      </div>
    </main>
  );
}
