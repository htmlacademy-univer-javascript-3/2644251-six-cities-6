import { render } from '@testing-library/react';
import Map from '.';

describe('Component: Map', () => {
  test('renders map container', () => {
    const { container } = render(<Map offers={[]} hoveredOfferId={null} />);
    const mapElement = container.querySelector('.cities__map');
    expect(mapElement).toBeInTheDocument();
  });
});
