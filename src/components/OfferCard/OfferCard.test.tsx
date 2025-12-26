import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OfferCard from '.';

describe('OfferCard', () => {
  const props = {
    id: 1,
    title: 'Beautiful Apartment',
    type: 'Apartment',
    price: 120,
    rating: 4.5,
    previewImage: 'img.jpg',
    isPremium: true,
    isFavorite: true,
  };

  it('renders correctly with given props', () => {
    render(
      <MemoryRouter>
        <OfferCard {...props} />
      </MemoryRouter>
    );

    expect(screen.getByText(props.title)).toBeInTheDocument();

    expect(screen.getByText(props.type)).toBeInTheDocument();

    expect(screen.getByText(`€${props.price}`)).toBeInTheDocument();

    expect(screen.getByText(/premium/i)).toBeInTheDocument();

    expect(screen.getByText(/in bookmarks/i)).toBeInTheDocument();

    const img = screen.getByAltText(props.title);
    expect(img).toBeInTheDocument();
    expect((img as HTMLImageElement).src).toContain(props.previewImage);
  });

  it('renders correctly when not premium and not favorite', () => {
    render(
      <MemoryRouter>
        <OfferCard {...props} isPremium={false} isFavorite={false} />
      </MemoryRouter>
    );

    expect(screen.queryByText(/premium/i)).not.toBeInTheDocument();

    expect(screen.getByText(/to bookmarks/i)).toBeInTheDocument();
  });
});
