import { useState } from 'react';
import OfferCard from '../OfferCard';
import { Offer } from '../../mocks/offers';

type OfferListProps = {
  offers: Offer[];
};

function OfferList({ offers }: OfferListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => setActiveOfferId(offer.id)}
          onMouseLeave={() => setActiveOfferId(null)}
        >
          <OfferCard {...offer} />
        </div>
      ))}

      {<p>Active offer id: {activeOfferId}</p>}
    </div>
  );
}

export default OfferList;
