import { render, screen } from '@testing-library/react';
import { Review as ReviewType } from '../../store/reviews/types';
import ReviewList from '.';

const mockReviews: ReviewType[] = [
  {
    id: '1',
    user: {
      name: 'Alice',
      avatarUrl: 'alice.jpg',
      isPro: true,
    },
    rating: 5,
    comment: 'Amazing place!',
    date: '2023-12-26T12:00:00Z',
  },
  {
    id: '2',
    user: {
      name: 'Bob',
      avatarUrl: 'bob.jpg',
      isPro: false,
    },
    rating: 4,
    comment: 'Very cozy!',
    date: '2023-11-15T12:00:00Z',
  },
];

describe('ReviewList component', () => {
  it('renders correctly with reviews', () => {
    render(<ReviewList reviews={mockReviews} />);

    expect(screen.getByText(/reviews/i)).toBeInTheDocument();

    expect(screen.getByText(mockReviews.length.toString())).toBeInTheDocument();

    mockReviews.forEach((review) => {
      expect(screen.getByText(review.comment)).toBeInTheDocument();
      expect(screen.getByText(review.user.name)).toBeInTheDocument();
    });
  });

  it('renders correctly with empty reviews', () => {
    render(<ReviewList reviews={[]} />);
    expect(screen.getByText(/reviews/i)).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
