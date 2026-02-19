import PlayerCard, { type FootballPlayer } from "../widgets/PlayerCard";
import "./Home.scss";

const popularPlayers: FootballPlayer[] = [
  {
    id: "messi",
    name: "Лионель Месси",
    position: "Нападающий",
    club: "Inter Miami",
    country: "Аргентина",
    achievements: ["Чемпион мира 2022", "8x Золотой мяч", "4x Лига чемпионов"],
  },
  {
    id: "ronaldo",
    name: "Криштиану Роналду",
    position: "Нападающий",
    club: "Al Nassr",
    country: "Португалия",
    achievements: ["5x Золотой мяч", "5x Лига чемпионов", "Чемпион Европы 2016"],
  },
  {
    id: "mbappe",
    name: "Килиан Мбаппе",
    position: "Нападающий",
    club: "Real Madrid",
    country: "Франция",
    achievements: ["Чемпион мира 2018", "Лучший бомбардир ЧМ 2022", "Многократный чемпион Франции"],
  },
  {
    id: "haaland",
    name: "Эрлинг Холанд",
    position: "Нападающий",
    club: "Manchester City",
    country: "Норвегия",
    achievements: ["Победитель Лиги чемпионов", "Обладатель требла", "Рекордсмен АПЛ по голам за сезон"],
  },
  {
    id: "de-bruyne",
    name: "Кевин Де Брёйне",
    position: "Полузащитник",
    club: "Manchester City",
    country: "Бельгия",
    achievements: ["Победитель Лиги чемпионов", "Многократный чемпион Англии", "Лучший плеймейкер Европы"],
  },
];

export default function FootballStarsHome() {
  return (
    <section className="screen football-stars">
      <header className="football-stars-hero">
        <h2>Популярные футболисты · v1</h2>
        <p className="football-stars-path">user / FootballStars / v1 / Home</p>
        <p className="football-stars-subtitle">
          Актуальные звезды мирового футбола и их ключевые достижения.
        </p>
      </header>

      <div className="football-stars-list">
        {popularPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </section>
  );
}
