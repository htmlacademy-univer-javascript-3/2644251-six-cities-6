import { render, screen, fireEvent } from '@testing-library/react';
import SortOptions from '.';

describe('Component: SortOptions', () => {
  test('renders current sort and options', () => {
    const handleChange = vi.fn();

    render(<SortOptions value="Popular" onChange={handleChange} />);

    const currentSort = screen.getByText('Popular', {
      selector: 'span.places__sorting-type',
    });
    expect(currentSort).toBeInTheDocument();

    fireEvent.click(currentSort);

    expect(screen.getByText('Price: low to high')).toBeInTheDocument();
    expect(screen.getByText('Top rated first')).toBeInTheDocument();
  });

  test('calls onChange when selecting a new sort', () => {
    const handleChange = vi.fn();

    render(<SortOptions value="Popular" onChange={handleChange} />);

    const currentSort = screen.getByText('Popular', {
      selector: 'span.places__sorting-type',
    });
    fireEvent.click(currentSort);

    const option = screen.getByText('Price: low to high');
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith('PriceLowHigh');
  });
});
