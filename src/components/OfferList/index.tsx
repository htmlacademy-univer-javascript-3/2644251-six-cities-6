import { useState } from 'react';
import OfferCard from '../OfferCard';
import { Offer } from '../../store/offers/types.ts';

type OfferListProps = {
  offers: Offer[];
  onHoverOffer?: (id: number | null) => void;
};

function OfferList({ offers, onHoverOffer }: OfferListProps) {
  const [, setActiveOfferId] = useState<number | null>(null);

  const handleMouseEnter = (id: number) => {
    setActiveOfferId(id);
    onHoverOffer?.(id);
  };

  const handleMouseLeave = () => {
    setActiveOfferId(null);
    onHoverOffer?.(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        >
          <OfferCard {...offer} />
        </div>
      ))}
    </div>
  );
}

export default OfferList;
