import { useState } from 'react';
import styles from './styles/styles.module.scss';

import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics ';
import Section from './Section/Section';
import Notification from './Notification/Notification';

const btnOptions = ['good', 'neutral', 'bad'];

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = propName => {
    setFeedback(prevState => {
      const value = prevState[propName];

      return { ...prevState, [propName]: value + 1 };
    });
  };

  const total = feedback.good + feedback.neutral + feedback.bad;

  const countPositiveFeedbackPercentage = propName => {
    if (!total) {
      return 0;
    }
    const value = feedback[propName];
    const result = ((value / total) * 100).toFixed(2);
    return Number(result);
  };

  const positivePercentage = countPositiveFeedbackPercentage('good');

  return (
    <div className={styles.wrapper}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={btnOptions}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {total !== 0 && (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
        {total === 0 && <Notification message="There is no feedback" />}
      </Section>
    </div>
  );
};

export default App;
