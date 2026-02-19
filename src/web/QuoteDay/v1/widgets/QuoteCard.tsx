import "./QuoteCard.scss";

export type Quote = {
  id: string;
  text: string;
  author: string;
  tag: string;
};

type QuoteCardProps = {
  quote: Quote;
};

export default function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <article className="quote-card">
      <p className="quote-card-text">"{quote.text}"</p>
      <footer className="quote-card-footer">
        <span className="quote-card-author">{quote.author}</span>
        <span className="quote-card-tag">{quote.tag}</span>
      </footer>
    </article>
  );
}
