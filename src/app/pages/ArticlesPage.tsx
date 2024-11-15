'use client';
import React from 'react';
import ArticleCard from '@/components/ArticleCard';
import Footer from '@/components/ui/footer';
import PageTitle from '@/components/ui/page-title';
import {
  articlesData,
  factorsArticles,
  FamilyTimeImpact,
  FitnessAndEmotionalBalance,
  HowSleepImpactsYourMood,
  HowSunshineLiftsYourSpirits,
  moodArticles,
  NatureMentalBenefits,
  NightOwlsVsEarlyBirds,
  PreparingEmotionallyForSeasonalChanges,
  SimpleWaysToBoostYourMoodFast,
  sleepArticles,
  TheRoleOfSleepCycles,
  TheScienceBehindFeelingGreatInTheMorning,
  TrackingMoodSwingsThroughoutYourDay,
  WaysToImproveYourSleep,
  WeatherAndProductivity,
  weatherArticles,
  WhyRainyDaysMakeYouFeelSad,
  WhyYouOftenFeelLowInTheAfternoon,
  WorkStressManagement,
} from '@/lib/constants';
import ArticleCategory from './articles/ArticleCategory';
import Article from '@/components/Article';

interface ArticlesPageProps {
  onArticleCategoryClicked: (articleCategoryName: string) => void;
  onArticleClicked: (article: string) => void;
  articleCategory: string;
  article: string;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({
  onArticleCategoryClicked,
  onArticleClicked,
  articleCategory,
  article,
}) => {
  const renderArticle = () => {
    switch (article) {
      case 'Why You Often Feel Low in the Afternoon 🦦':
        return (
          <Article
            title={WhyYouOftenFeelLowInTheAfternoon.title}
            description={WhyYouOftenFeelLowInTheAfternoon.description}
            content={WhyYouOftenFeelLowInTheAfternoon.content}
          />
        );
      case 'Simple Ways to Boost Your Mood Fast 💖':
        return (
          <Article
            title={SimpleWaysToBoostYourMoodFast.title}
            description={SimpleWaysToBoostYourMoodFast.description}
            content={SimpleWaysToBoostYourMoodFast.content}
          />
        );
      case 'The Science Behind Feeling Great in the Morning 🌞':
        return (
          <Article
            title={TheScienceBehindFeelingGreatInTheMorning.title}
            description={TheScienceBehindFeelingGreatInTheMorning.description}
            content={TheScienceBehindFeelingGreatInTheMorning.content}
          />
        );
      case 'Tracking Mood Swings Throughout Your Day 🎢':
        return (
          <Article
            title={TrackingMoodSwingsThroughoutYourDay.title}
            description={TrackingMoodSwingsThroughoutYourDay.description}
            content={TrackingMoodSwingsThroughoutYourDay.content}
          />
        );
      case 'Why Rainy Days Make You Feel Sad 🌧':
        return (
          <Article
            title={WhyRainyDaysMakeYouFeelSad.title}
            description={WhyRainyDaysMakeYouFeelSad.description}
            content={WhyRainyDaysMakeYouFeelSad.content}
          />
        );
      case 'How Sunshine Lifts Your Spirits 🐣':
        return (
          <Article
            title={HowSunshineLiftsYourSpirits.title}
            description={HowSunshineLiftsYourSpirits.description}
            content={HowSunshineLiftsYourSpirits.content}
          />
        );
      case 'Weather and Productivity: Surprising Links 🦔':
        return (
          <Article
            title={WeatherAndProductivity.title}
            description={WeatherAndProductivity.description}
            content={WeatherAndProductivity.content}
          />
        );
      case 'Preparing Emotionally for Seasonal Changes 🍂':
        return (
          <Article
            title={PreparingEmotionallyForSeasonalChanges.title}
            description={PreparingEmotionallyForSeasonalChanges.description}
            content={PreparingEmotionallyForSeasonalChanges.content}
          />
        );
      case 'How Sleep Impacts Your Mood 🪼':
        return (
          <Article
            title={HowSleepImpactsYourMood.title}
            description={HowSleepImpactsYourMood.description}
            content={HowSleepImpactsYourMood.content}
          />
        );
      case 'Ways to Improve Your Sleep for Better Mental Health 🧘🏼‍♀️':
        return (
          <Article
            title={WaysToImproveYourSleep.title}
            description={WaysToImproveYourSleep.description}
            content={WaysToImproveYourSleep.content}
          />
        );
      case 'The Role of Sleep Cycles in Emotional Stability 🕯':
        return (
          <Article
            title={TheRoleOfSleepCycles.title}
            description={TheRoleOfSleepCycles.description}
            content={TheRoleOfSleepCycles.content}
          />
        );
      case "Night Owls vs. Early Birds: Who's Happier? 🌝":
        return (
          <Article
            title={NightOwlsVsEarlyBirds.title}
            description={NightOwlsVsEarlyBirds.description}
            content={NightOwlsVsEarlyBirds.content}
          />
        );
      case 'The Impact of Family Time on Your Mood 👵🏼':
        return (
          <Article
            title={FamilyTimeImpact.title}
            description={FamilyTimeImpact.description}
            content={FamilyTimeImpact.content}
          />
        );
      case 'Why Fitness Is Key to Emotional Balance 🏄🏻‍♀️':
        return (
          <Article
            title={FitnessAndEmotionalBalance.title}
            description={FitnessAndEmotionalBalance.description}
            content={FitnessAndEmotionalBalance.content}
          />
        );
      case 'Managing Work Stress to Stay Happy 👩🏻‍💻':
        return (
          <Article
            title={WorkStressManagement.title}
            description={WorkStressManagement.description}
            content={WorkStressManagement.content}
          />
        );
      case 'The Mental Benefits of Spending Time in Nature 🌱':
        return (
          <Article
            title={NatureMentalBenefits.title}
            description={NatureMentalBenefits.description}
            content={NatureMentalBenefits.content}
          />
        );
      default:
        return null;
    }
  };

  const renderCategory = () => {
    switch (articleCategory) {
      case 'Mood and Daily Patterns 🧶':
        return (
          <ArticleCategory
            title='Mood and Daily Patterns'
            articles={moodArticles}
            onArticleClicked={onArticleClicked}
          />
        );
      case 'Mood and Weather 🌪':
        return (
          <ArticleCategory
            title='Mood and Weather'
            articles={weatherArticles}
            onArticleClicked={onArticleClicked}
          />
        );
      case 'Mood and Sleep 💤':
        return (
          <ArticleCategory
            title='Mood and Sleep'
            articles={sleepArticles}
            onArticleClicked={onArticleClicked}
          />
        );
      case 'Mood and Factors 🌈':
        return (
          <ArticleCategory
            title='Mood and Factors'
            articles={factorsArticles}
            onArticleClicked={onArticleClicked}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div>
      {articleCategory === '' && (
        <>
          <PageTitle title='Discover useful information about your mood' />
          <div className='x0:flex x0:flex-col xs:grid xs:grid-cols-2 gap-4 pt-10'>
            {articlesData.map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                description={article.description}
                articles={article.articles}
                onArticleCategoryClicked={onArticleCategoryClicked}
              />
            ))}
          </div>
        </>
      )}
      {article === '' && renderCategory()}
      {article != '' && renderArticle()}
      <Footer />
    </div>
  );
};

export default ArticlesPage;
