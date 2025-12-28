import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as redux from 'react-redux';
import OfferCard from '.';
import { AppDispatch } from '../../store';

const mockDispatch: AppDispatch = vi.fn() as unknown as AppDispatch;

vi.mock('react-redux', async () => {
  const actual: typeof redux = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

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
    expect((img as HTMLImageElement).src).toContain(props.previewImage);
  });

  it('calls dispatch when bookmark button is clicked', () => {
    render(
      <MemoryRouter>
        <OfferCard {...props} />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
