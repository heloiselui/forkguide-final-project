import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '25px',
  headerBgColor: '#2D3E50',
  headerFontColor: '#FFFFFF',
  headerFontSize: '1.25rem',
  botBubbleColor: '#2D3E50',
  botFontColor: '#FFFFFF',
  userBubbleColor: '#FFFFFF',
  userFontColor: '#4a4a4a',
};

const steps = [
  {
    id: '1',
    message: `Hey, welcome to ForkGuide. I'm your nutrition assistant. How can I help?`,
    trigger: 'options',
  },
  {
    id: 'options',
    options: [
      { value: 'calories', label: 'Calculate daily calories', trigger: 'calories' },
      { value: 'water', label: 'Recommend water intake', trigger: 'water' },
    ],
  },
  {
    id: 'calories',
    message: 'Please enter your weight (in kg): ',
    trigger: 'weight',
  },
  {
    id: 'weight',
    user: true,
    validator: (value) => {
      if (isNaN(value) || value <= 0) {
        return 'Please enter a valid weight.';
      }
      return true;
    },
    trigger: 'height',
  },
  {
    id: 'height',
    message: 'Please enter your height (in cm): ',
    trigger: 'userHeight',
  },
  {
    id: 'userHeight',
    user: true,
    validator: (value) => {
      if (isNaN(value) || value <= 0) {
        return 'Please enter a valid height.';
      }
      return true;
    },
    trigger: 'age',
  },
  {
    id: 'age',
    message: 'Please inform your age: ',
    trigger: 'userAge',
  },
  {
    id: 'userAge',
    user: true,
    validator: (value) => {
      if (isNaN(value) || value <= 0) {
        return 'Please enter a valid age.';
      }
      return true;
    },
    trigger: 'gender',
  },
  {
    id: 'gender',
    message: 'Please select your gender:',
    trigger: 'userGender',
  },
  {
    id: 'userGender',
    options: [
      { value: 'male', label: 'Male', trigger: 'calculateCalories' },
      { value: 'female', label: 'Female', trigger: 'calculateCalories' },
    ],
  },
  {
    id: 'calculateCalories',
    message: 'Calculating your daily calories...',
    trigger: 'showCalories',
  },
  {
    id: 'showCalories',
    message: ({ steps }) => {
      const weight = parseFloat(steps.weight.value);
      const height = parseFloat(steps.userHeight.value);
      const age = parseInt(steps.userAge.value, 10);
      const gender = steps.userGender.value;

      let bmi;
      if (gender === 'male') {
        bmi = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmi = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      return `Your recommended daily calories are: ${bmi.toFixed(2)} kcal`;
    },
    trigger: 'endOrCancel',
  },
  {
    id: 'water',
    message: 'Please enter your weight (in kg):',
    trigger: 'userWeight',
  },
  {
    id: 'userWeight',
    user: true,
    validator: (value) => {
      if (isNaN(value) || value <= 0) {
        return 'Please enter a valid weight.';
      }
      return true;
    },
    trigger: 'calculateWater',
  },
  {
    id: 'calculateWater',
    message: ({ previousValue }) => {
      const weight = parseFloat(previousValue);
      const intake = weight * 0.033;
      return `You should drink about ${intake.toFixed(2)} litres of water a day.`;
    },
    trigger: 'endOrCancel',
  },
  {
    id: 'endOrCancel',
    message: 'Do you want to go back to the main menu?',
    trigger: 'endOptions',
  },
  {
    id: 'endOptions',
    options: [
      { value: 'yes', label: 'Yes', trigger: 'options' },
      { value: 'no', label: 'No', trigger: 'endMessage' },
    ],
  },
  {
    id: 'endMessage',
    message: 'Okay, feel free to ask anything else!',
    end: true,
  },
];

const NutritionChatBot = () => {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} floating={true} />
    </ThemeProvider>
  );
};

export default NutritionChatBot;
