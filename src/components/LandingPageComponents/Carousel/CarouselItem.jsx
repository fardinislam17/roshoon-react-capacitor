import { Link } from 'react-router-dom';

const CarouselItem = ({ slide, isActive, height }) => {
  const { image, header, title, path } = slide;
  const carouselImageHeight = `${parseInt(height, 10) - 160}px`;

  return (
    <div className="w-full flex-shrink-0 relative">
      <img
        src={image}
        alt={title}
        className="w-full object-cover"
        aria-hidden={!isActive}
        style={{ height: carouselImageHeight }}
      />
      {isActive && (
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 p-4 text-black text-center">
          <h2
            className="font-julius text-2xl mb-7 whitespace-nowrap"
            title={header}
          >
            {header}
          </h2>
          <Link
            to={path}
            className="px-4 py-[9px] font-lato tracking-[0.66px] font-semibold text-[11px] leading-[14px] text-center border border-black uppercase inline-block"
          >
            {title}
          </Link>
        </div>
      )}
    </div>
  );
};

export default CarouselItem;
