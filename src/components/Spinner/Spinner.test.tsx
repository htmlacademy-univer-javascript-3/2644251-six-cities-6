import { render, screen } from '@testing-library/react';
import Spinner from '.';

describe('Spinner component', () => {
  it('renders correctly', () => {
    render(<Spinner />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    const container = document.querySelector('.spinner');
    expect(container).toBeInTheDocument();

    const loader = document.querySelector('.spinner__loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveTextContent('Loading...');
  });
});
