import "./PlayerCard.scss";

export type FootballPlayer = {
  id: string;
  name: string;
  position: string;
  club: string;
  country: string;
  achievements: string[];
};

type PlayerCardProps = {
  player: FootballPlayer;
};

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <article className="football-stars-card">
      <div className="football-stars-card-head">
        <h3>{player.name}</h3>
        <span>{player.position}</span>
      </div>
      <p className="football-stars-club">
        {player.club} · {player.country}
      </p>
      <ul className="football-stars-achievements">
        {player.achievements.map((achievement) => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
    </article>
  );
}
