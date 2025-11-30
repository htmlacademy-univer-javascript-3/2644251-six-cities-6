type ReviewProps = {
  review: {
    id: number;
    user: {
      name: string;
      avatarUrl: string;
    };
    rating: number;
    comment: string;
    date: string;
  };
};

function Review({ review }: ReviewProps): JSX.Element {
  const { user, rating, comment, date } = review;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt={`${user.name}'s avatar`}
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>

      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${(rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>
          {formattedDate}
        </time>
      </div>
    </li>
  );
}

export default Review;
