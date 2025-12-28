import { render, screen, fireEvent } from '@testing-library/react';
import OfferList from '.';
import { Offer } from '../../store/offers/types';

vi.mock('../offer-card', () => ({
  default: ({
    id,
    title,
    isFavorite,
    toggleFavorite,
  }: {
    id: number;
    title: string;
    isFavorite?: boolean;
    toggleFavorite?: () => void;
  }) => (
    <div data-testid={`offer-card-${id}`}>
      <span>{title}</span>
      <button onClick={toggleFavorite}>
        {isFavorite ? 'In bookmarks' : 'To bookmarks'}
      </button>
    </div>
  ),
}));

const mockOffers: Offer[] = [
  {
    id: 1,
    title: 'First offer',
    type: 'apartment',
    price: 100,
    rating: 4,
    previewImage: 'img.jpg',
    isPremium: false,
    isFavorite: false,
    location: { latitude: 52.39, longitude: 4.85, zoom: 12 },
    city: {
      name: 'Amsterdam',
      location: { latitude: 52.39, longitude: 4.85, zoom: 12 },
    },
  },
  {
    id: 2,
    title: 'Second offer',
    type: 'room',
    price: 80,
    rating: 3,
    previewImage: 'img2.jpg',
    isPremium: true,
    isFavorite: true,
    location: { latitude: 52.4, longitude: 4.9, zoom: 12 },
    city: {
      name: 'Amsterdam',
      location: { latitude: 52.39, longitude: 4.85, zoom: 12 },
    },
  },
];

describe('Component: OfferList', () => {
  test('renders all offers', () => {
    render(<OfferList offers={mockOffers} />);

    expect(screen.getByText('First offer')).toBeInTheDocument();
    expect(screen.getByText('Second offer')).toBeInTheDocument();
  });

  test('calls onHoverOffer on mouse enter and leave', () => {
    const onHoverOffer = vi.fn();
    render(<OfferList offers={mockOffers} onHoverOffer={onHoverOffer} />);

    const firstOfferWrapper = screen.getByText('First offer').closest('div')!;
    fireEvent.mouseEnter(firstOfferWrapper);
    expect(onHoverOffer).toHaveBeenCalledWith(1);

    fireEvent.mouseLeave(firstOfferWrapper);
    expect(onHoverOffer).toHaveBeenCalledWith(null);
  });
});
