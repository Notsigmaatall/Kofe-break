import Link from "next/link";
import { CupDoodle, Icon } from "@/components/icons";
export default function NotFound() {
  return (
    <div className="container not-found">
      <span className="eyebrow">404 / МАЛЕНЬКАЯ ЗАМИНКА</span>
      <CupDoodle />
      <h1>
        Эта пауза
        <br />
        куда-то ушла.
      </h1>
      <p>Зато меню всегда под рукой.</p>
      <Link href="/menu/" className="button primary">
        Вернуться к кофе <Icon name="arrow" />
      </Link>
    </div>
  );
}
