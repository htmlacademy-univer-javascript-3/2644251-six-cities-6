import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setCity } from '../../store/offers/reducer';

const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export default function CitiesList() {
  const dispatch = useDispatch();
  const activeCity = useSelector((state: RootState) => state.offers.city);

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city}>
          <a
            className={`locations__item-link tabs__item
              ${city === activeCity ? 'tabs__item--active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              dispatch(setCity(city));
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
