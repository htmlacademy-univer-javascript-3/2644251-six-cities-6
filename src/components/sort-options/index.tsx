import { useState } from 'react';
import { SORTING } from '../../const';

type SortOptionsProps = {
  value: string;
  onChange: (newValue: string) => void;
};

const SortOptions = ({ value, onChange }: SortOptionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (newValue: string) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>

      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {SORTING.find((s) => s.value === value)?.label}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul
        className={`places__options places__options--custom${
          isOpen ? ' places__options--opened' : ''
        }`}
      >
        {SORTING.map((item) => (
          <li
            key={item.value}
            className={`places__option${
              item.value === value ? ' places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => handleSelect(item.value)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SortOptions;
