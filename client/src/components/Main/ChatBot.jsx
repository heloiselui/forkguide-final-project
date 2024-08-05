import React, { useEffect, useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

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

const NutritionChatBot = () => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_BASE_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (isMounted) {
          const userWeight = data.weight;
          const userHeight = data.height;
          const userAge = data.age;
          const userGender = data.gender;
          const weightGoal = data.weightGoal;

          const chatbotSteps = [
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
              message: `Based on your profile, your weight is ${userWeight}kg, your height is ${userHeight}cm, your age is ${userAge} and your gender is ${userGender}. Calculating your daily calories...`,
              trigger: 'calculateCalories',
            },
            {
              id: 'calculateCalories',
              message: () => {
                const weight = userWeight;
                const height = userHeight;
                const age = userAge;
                const gender = userGender;
                const goalWeight = weightGoal;

                let bmr;
                if (gender === 'male') {
                  bmr = 10 * weight + 6.25 * height - 5 * age + 5;
                } else {
                  bmr = 10 * weight + 6.25 * height - 5 * age - 161;
                }

                let calories;
                if (goalWeight > weight) {
                  calories = bmr + 500;
                } else {
                  calories = bmr - 500;
                }

                return `To reach your goal of ${goalWeight}kg, you should consume approximately ${calories.toFixed(0)} kcal per day.`;
              },
              trigger: 'endOrCancel',
            },
            {
              id: 'water',
              message: `Based on your profile, your weight is ${userWeight}kg. Calculating your recommended water intake...`,
              trigger: 'calculateWater',
            },
            {
              id: 'calculateWater',
              message: () => {
                const weight = userWeight;
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
              message: 'Okay, see you soon then!',
              end: true,
            },
          ];

          setSteps(chatbotSteps);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {steps.length > 0 && <ChatBot steps={steps} floating={true} />}
    </ThemeProvider>
  );
};

export default NutritionChatBot;