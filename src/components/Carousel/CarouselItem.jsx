const CarouselItem = ({ slide, isActive, height }) => {
  const { image, header, title, subHeader } = slide;
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
          {/* <h3 className="text-black">{subHeader}</h3> */}
          <h2 className="font-julius text-2xl mb-7">{header}</h2>
          <h4 className="py-[9px] font-lato tracking-[0.66px] font-semibold text-[11px] leading-[14px] text-center  border border-black uppercase">
            {title}
          </h4>
        </div>
      )}
    </div>
  );
};

export default CarouselItem;
