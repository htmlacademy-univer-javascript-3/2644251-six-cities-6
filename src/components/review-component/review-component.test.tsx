import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Review from '.';

describe('Review component', () => {
  const mockReview = {
    id: '1',
    user: {
      name: 'John Doe',
      avatarUrl: 'avatar.jpg',
      isPro: false,
    },
    rating: 4,
    comment: 'Great place!',
    date: '2023-12-26T12:00:00Z',
  };

  it('renders review correctly', () => {
    render(<Review review={mockReview} />);

    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();

    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();

    const img = screen.getByAltText(`${mockReview.user.name}'s avatar`);
    expect(img).toBeInTheDocument();
    expect((img as HTMLImageElement).src).toContain(mockReview.user.avatarUrl);

    const formattedDate = new Date(mockReview.date).toLocaleDateString(
      'en-US',
      {
        month: 'long',
        year: 'numeric',
      }
    );
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});
