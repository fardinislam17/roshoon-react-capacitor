import React from 'react';
import { useTranslation } from 'react-i18next';
import chefImage from 'src/assets/images/chef-opportunity-landing.jpg';
import communityImage from 'src/assets/images/community-landing.png';
import mealImage from 'src/assets/images/good-quality-meal.png';
import SectionImageCard from './SectionImageCard';

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
    <div className="px-5 mx-auto">
      <div className="space-y-10 sm:space-y-16 px-4 py-10 lg:py-20">
        {cards.map((card) => (
          <SectionImageCard key={card?.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default LandingFeature;
