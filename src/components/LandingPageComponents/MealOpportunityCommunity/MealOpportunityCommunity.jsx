import React from 'react';
import { useTranslation } from 'react-i18next';
import chefImage from 'src/assets/images/chef-opportunity-landing.jpg';
import communityImage from 'src/assets/images/community-landing.png';
import mealImage from 'src/assets/images/good-quality-meal.png';
import ImageContentLayout from 'src/components/ImageContentLayout';

const LandingFeature = () => {
  const { t } = useTranslation();
  const cards = [
    {
      id: 1,
      image: mealImage,
      title: t('common.mealQualityTitle'),
      description: t('common.mealQualityDescription'),
      imageOnLeft: true,
    },
    {
      id: 2,
      image: chefImage,
      title: t('common.chefsOpportunitiesTitle'),
      description: t('common.chefsOpportunitiesDescription'),
      buttonText: t('common.becomeAChef'),
      imageOnLeft: false,
    },
    {
      id: 3,
      image: communityImage,
      title: t('common.nurturingCommunityTitle'),
      description: t('common.nurturingCommunityDescription'),
      imageOnLeft: true,
    },
  ];

  return (
    <div className="sm:px-5 xl:px-0 mx-auto">
      <div className="space-y-10 sm:space-y-20 lg:space-y-28 py-10 lg:py-20">
        {cards.map((card) => (
          <ImageContentLayout key={card?.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default LandingFeature;
