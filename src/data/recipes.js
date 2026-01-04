
export const recipes = [
  {
    id: 'lunch-curd-rice',
    name: 'Dilkush Curd Rice',
    type: 'lunch',
    cuisine: 'south-indian',
    nutrition: { calories: 280, protein: '6g', fat: '8g', carbs: '45g' },
    prepTime: 'Prep: 5m | Cook: 15m',
    videoUrl: 'https://www.youtube.com/results?search_query=Curd+Rice+Recipe+for+Kids',
    ingredients: ['1 cup Rice (mushed)', '1.5 cups Curd (Yogurt)', '2 tbsp Milk', 'Salt', 'Carrot (grated) - optional', 'Coriander'],
    instructions: [
      '1. Cook rice until soft and mushy.',
      '2. Mix with fresh curd and milk (milk prevents souring).',
      '3. Add grated carrot and coriander for color.',
      '4. Temper with mustard seeds if liked, else serve plain.',
      '5. Packing Tip: Add a few pomegranate seeds for sweetness.'
    ],
    tags: ['probiotic', 'cooling', 'easy']
  },
  {
    id: 'lunch-chapati-paneer',
    name: 'Soft Chapati & Paneer Bhurji',
    type: 'lunch',
    cuisine: 'north-indian',
    nutrition: { calories: 320, protein: '12g', fat: '14g', carbs: '35g' },
    prepTime: 'Prep: 15m | Cook: 15m',
    videoUrl: 'https://www.youtube.com/results?search_query=Paneer+Bhurji+for+Kids',
    ingredients: ['2 Chapatis', '100g Paneer (crumbled)', '1 small Onion', '1 Tomato', 'Turmeric', 'Salt', 'Butter'],
    instructions: [
      '1. Make soft chapatis with ghee.',
      '2. Sauté chopped onions and tomatoes in butter.',
      '3. Add crumbled paneer, turmeric, and salt.',
      '4. Cook for 2 mins. Don\'t overcook paneer.',
      '5. Roll paneer inside chapati or pack separately.'
    ],
    tags: ['protein-rich', 'calcium', 'filling']
  },
  {
    id: 'lunch-mini-idli',
    name: 'Ghee Mini Idlis & Sambar',
    type: 'lunch',
    cuisine: 'south-indian',
    nutrition: { calories: 260, protein: '8g', fat: '5g', carbs: '50g' },
    prepTime: 'Prep: 10m | Cook: 15m',
    videoUrl: 'https://www.youtube.com/results?search_query=Mini+Idli+Sambar+Recipe',
    ingredients: ['15 Mini Idlis', '1 cup Mild Sambar', '1 tbsp Ghee'],
    instructions: [
      '1. Steam mini idlis.',
      '2. Make mild sambar with less spice and more dal/veggies.',
      '3. Dip idlis in sambar bowl or pack sambar separately.',
      '4. Drizzle generic amount of Ghee on top.',
      '5. Tip: Mini idlis occupy kids for longer time!'
    ],
    tags: ['steamed', 'healthy', 'traditional']
  },
  {
    id: 'lunch-lemon-rice',
    name: 'Tangy Lemon Rice',
    type: 'lunch',
    cuisine: 'south-indian',
    nutrition: { calories: 300, protein: '4g', fat: '10g', carbs: '45g' },
    prepTime: 'Prep: 5m | Cook: 15m',
    videoUrl: 'https://www.youtube.com/results?search_query=Lemon+Rice+Recipe',
    ingredients: ['1 cup Cooked Rice', '1 tbsp Lemon Juice', 'Peanuts (roasted)', 'Turmeric', 'Curry Leaves', 'Salt'],
    instructions: [
      '1. Heat oil, splutter mustard seeds and peanuts.',
      '2. Add curry leaves and turmeric.',
      '3. Mix in cooked cooled rice and salt.',
      '4. Squeeze lemon juice after turning off heat to avoid bitterness.',
      '5. Pack with potato fry.'
    ],
    tags: ['zesty', 'vitamin-c', 'quick']
  },
  {
    id: 'lunch-veg-pulao',
    name: 'Mild Veg Pulao',
    type: 'lunch',
    cuisine: 'indian',
    nutrition: { calories: 290, protein: '5g', fat: '8g', carbs: '400g' },
    prepTime: 'Prep: 10m | Cook: 20m',
    videoUrl: 'https://www.youtube.com/results?search_query=Mild+Veg+Pulao+for+Kids',
    ingredients: ['1 cup Basmati Rice', 'Carrot', 'Peas', 'Beans', 'Ghee', 'Whole Spices (Cardamom, Clove)'],
    instructions: [
      '1. Wash and soak basmati rice.',
      '2. Sauté whole spices and veggies in ghee.',
      '3. Add rice and water (1:2 ratio).',
      '4. Pressure cook for 2 whistles.',
      '5. Fluff up with fork. Serve with raita.'
    ],
    tags: ['vegetables', 'aromatic', 'one-pot']
  },
  {
    id: 'lunch-chapati-roll',
    name: 'Veg Chapati Roll',
    type: 'lunch',
    cuisine: 'fusion',
    nutrition: { calories: 280, protein: '5g', fat: '7g', carbs: '40g' },
    prepTime: 'Prep: 10m | Cook: 15m',
    videoUrl: 'https://www.youtube.com/results?search_query=Veg+Kathi+Roll+Recipe+for+Kids',
    ingredients: ['2 Chapatis', 'Carrot', 'Cabbage', 'Capsicum', 'Tomato Ketchup', 'Cheese (optional)'],
    instructions: [
      '1. Julienne all veggies.',
      '2. Stir fry mainly on high heat with salt and pepper.',
      '3. Spread ketchup on chapati.',
      '4. Place veggie filling and cheese.',
      '5. Roll tightly and wrap in foil/paper.'
    ],
    tags: ['fun', 'veggies', 'hand-held']
  },
  {
    id: 'lunch-fried-idli',
    name: 'Veg Fried Mini Idli',
    type: 'lunch',
    cuisine: 'fusion',
    nutrition: { calories: 270, protein: '6g', fat: '8g', carbs: '45g' },
    prepTime: 'Prep: 15m | Cook: 10m',
    videoUrl: 'https://www.youtube.com/results?search_query=Masala+Fried+Idli+Recipe',
    ingredients: ['15 Mini Idlis', 'Onion', 'Tomato', 'Capsicum', 'Pav Bhaji Masala'],
    instructions: [
      '1. Make mini idlis.',
      '2. Sauté chopped onion, tomato, capsicum.',
      '3. Add pinch of pav bhaji masala and salt.',
      '4. Toss idlis in the masala.',
      '5. Colorful and tasty twist to plain idlis.'
    ],
    tags: ['spicy-mild', 'colorful', 'snack-like']
  },
  {
    id: 'lunch-paneer-paratha',
    name: 'Paneer Paratha',
    type: 'lunch',
    cuisine: 'north-indian',
    nutrition: { calories: 340, protein: '14g', fat: '15g', carbs: '38g' },
    prepTime: 'Prep: 15m | Cook: 15m',
    videoUrl: 'https://www.youtube.com/results?search_query=Paneer+Paratha+Recipe',
    ingredients: ['Whole Wheat Dough', 'Paneer (Grated)', 'Coriander', 'Cumin Powder', 'Salt', 'Butter'],
    instructions: [
      '1. Mix grated paneer with salt, cumin, and coriander.',
      '2. Stuff into wheat dough ball.',
      '3. Roll gently without breaking.',
      '4. Roast on tawa with butter/ghee till golden.',
      '5. Serve with curd or pickle.'
    ],
    tags: ['stuffed', 'heavy', 'yummy']
  },

  /* --- SIDES --- */
  {
    id: 'side-potato-fry',
    name: 'Potato Fry (Aloo Fry)',
    type: 'lunch_side',
    cuisine: 'general',
    nutrition: { calories: 150, protein: '2g', fat: '8g', carbs: '20g' },
    prepTime: 'Prep: 5m | Cook: 15m',
    videoUrl: 'https://www.youtube.com/results?search_query=Simple+Potato+Fry+for+Kids',
    ingredients: ['2 Potatoes (peeled & cubed small)', '1/2 tsp Mustard seeds', '1/4 tsp Turmeric powder', '1/2 tsp Sambar powder or Mild Chili powder', 'Salt', '1 tbsp Oil'],
    instructions: [
      '1. Heat oil in a pan. Add mustard seeds.',
      '2. Add cubed potatoes, turmeric, and salt. Mix well.',
      '3. Cover and cook on low-medium heat for 5-7 mins until potatoes are soft.',
      '4. Open lid, add sambar powder/chili powder.',
      '5. Roast on open flame for another 5 mins until slightly crispy.',
      '6. Excellent combo with Curd Rice.'
    ],
    tags: ['kids-favorite', 'crispy']
  },
  {
    id: 'side-cauliflower-fry',
    name: 'Cauliflower Fry (Gobi Fry)',
    type: 'lunch_side',
    cuisine: 'general',
    nutrition: { calories: 140, protein: '3g', fat: '7g', carbs: '15g' },
    prepTime: 'Prep: 10m | Cook: 15m',
    videoUrl: 'https://www.youtube.com/results?search_query=Cauliflower+Stir+Fry+South+Indian',
    ingredients: ['1 cup Cauliflower florets (small)', '1/2 Onion', 'Curry leaves', 'Turmeric', 'Salt', 'Pepper'],
    instructions: [
      '1. Blanch cauliflower in hot turmeric water for 5 mins.',
      '2. Drain well.',
      '3. Heat oil, sauté onion and curry leaves.',
      '4. Add cauliflower and roast on medium flame.',
      '5. Season with salt and pepper.',
      '6. Keep it dry and crunchy.'
    ],
    tags: ['veggie', 'crunchy']
  },
  {
    id: 'side-egg-curry',
    name: 'Mild Egg Curry',
    type: 'lunch_side',
    cuisine: 'indian',
    nutrition: { calories: 180, protein: '7g', fat: '12g', carbs: '5g' },
    prepTime: 'Prep: 10m | Cook: 15m',
    videoUrl: 'https://www.youtube.com/results?search_query=Mild+Egg+Curry+for+Kids',
    ingredients: ['2 Boiled Eggs', 'Onion', 'Tomato', 'Ginger Garlic Paste', 'Turmeric', 'Coconut Milk (optional)'],
    instructions: [
      '1. Sauté onion and ginger garlic paste.',
      '2. Add tomato puree and cook till oil separates.',
      '3. Add turmeric and mild masala.',
      '4. Add water/coconut milk and boil.',
      '5. Slit boiled eggs and add to gravy.',
      '6. Simmer for 5 mins.'
    ],
    tags: ['protein', 'combo-with-rice']
  },
  {
    id: 'side-chicken-fry',
    name: 'Kids Chicken Fry',
    type: 'lunch_side',
    cuisine: 'non-veg',
    nutrition: { calories: 220, protein: '20g', fat: '12g', carbs: '5g' },
    prepTime: 'Prep: 20m | Cook: 20m',
    videoUrl: 'https://www.youtube.com/results?search_query=Kids+Chicken+Fry+Recipe',
    ingredients: ['150g Chicken (boneless cubes)', 'Curd', 'Ginger Garlic Paste', 'Pepper Powder', 'Corn Flour', 'Salt'],
    instructions: [
      '1. Marinate chicken with curd, ginger-garlic, salt, pepper for 20 mins.',
      '2. Dust with corn flour lightly.',
      '3. Shallow fry in pan until golden and cooked.',
      '4. Ensure pieces are small and tender.',
      '5. Drain excess oil on tissue.'
    ],
    tags: ['high-protein', 'weekend-special']
  },
  {
    id: 'side-prawns-fry',
    name: 'Golden Prawns Fry',
    type: 'lunch_side',
    cuisine: 'non-veg',
    nutrition: { calories: 200, protein: '18g', fat: '10g', carbs: '4g' },
    prepTime: 'Prep: 15m | Cook: 10m',
    videoUrl: 'https://www.youtube.com/results?search_query=Prawns+Fry+Recipe+for+Kids',
    ingredients: ['150g Prawns (cleaned)', 'Turmeric', 'Chili Powder (mild)', 'Lemon Juice', 'Semolina (Rava)'],
    instructions: [
      '1. Marinate prawns with turmeric, mild chili, salt, lemon.',
      '2. Roll in semolina (rava) for crunch.',
      '3. Tawa fry with little oil.',
      '4. Cook for 3-4 mins each side. Don\'t overcook (gets rubbery).',
      '5. Crispy outside, soft inside.'
    ],
    tags: ['seafood', 'crispy']
  },

  /* --- SNACKS --- */
  {
    id: 'snack-carrot-sticks',
    name: 'Carrot & Cucumber Sticks',
    type: 'snack',
    cuisine: 'raw',
    nutrition: { calories: 40, protein: '1g', fat: '0g', carbs: '10g' },
    prepTime: 'Prep: 5m | Cook: 0m',
    videoUrl: 'https://www.youtube.com/results?search_query=Vegetable+Sticks+for+Kids+Lunchbox',
    ingredients: ['1 Carrot', '1 Cucumber', 'Hummus or Yogurt Dip (optional)'],
    instructions: [
      '1. Peel and cut veggies into finger-length sticks.',
      '2. Keep them crunchy.',
      '3. Pack a small container of dip if desired.'
    ],
    tags: ['crunchy', 'vitamins', 'raw']
  },
  {
    id: 'snack-fruit-salad',
    name: 'Fresh Fruit Salad',
    type: 'snack',
    cuisine: 'raw',
    nutrition: { calories: 80, protein: '1g', fat: '0g', carbs: '20g' },
    prepTime: 'Prep: 10m | Cook: 0m',
    videoUrl: 'https://www.youtube.com/results?search_query=Fruit+Salad+Design+Ideas',
    ingredients: ['Apple', 'Banana', 'Pomegranate', 'Grapes', 'Honey (optional)'],
    instructions: [
      '1. Chop fruits into bite sizes.',
      '2. Mix together.',
      '3. Squeeze little orange juice to prevent apples browning.',
      '4. Use colorful fork.'
    ],
    tags: ['sweet', 'natural', 'antioxidants']
  },
  {
    id: 'snack-makhana',
    name: 'Roasted Makhana',
    type: 'snack',
    cuisine: 'indian',
    nutrition: { calories: 120, protein: '3g', fat: '4g', carbs: '20g' },
    prepTime: 'Prep: 2m | Cook: 10m',
    videoUrl: 'https://www.youtube.com/results?search_query=Roasted+Makhana+Recipe',
    ingredients: ['2 cups Phool Makhana (Lotus Seeds)', '1 tbsp Ghee', '1/4 tsp Turmeric', 'Salt', 'Pinch of Pepper'],
    instructions: [
      '1. Heat ghee in a wide heavy-bottom pan.',
      '2. Add makhana and roast on low flame for 7-10 mins.',
      '3. Check crunchiness by crushing one.',
      '4. Add salt, turmeric, pepper.',
      '5. Cool and store in airtight box.'
    ],
    tags: ['protein', 'crunchy', 'light']
  },
  {
    id: 'snack-chana',
    name: 'Boiled Black Chana',
    type: 'snack',
    cuisine: 'indian',
    nutrition: { calories: 140, protein: '8g', fat: '2g', carbs: '22g' },
    prepTime: 'Prep: Soak 8hr | Cook: 15m',
    videoUrl: 'https://www.youtube.com/results?search_query=Boiled+Kala+Chana+Chaat',
    ingredients: ['1/2 cup Kala Chana (soaked overnight)', 'Salt', 'Lemon', 'Chaats Masala'],
    instructions: [
      '1. Pressure cook soaked chana with salt for 4 whistles.',
      '2. Drain water.',
      '3. Toss with little lemon juice and chat masala.',
      '4. Very high protein/iron snack.'
    ],
    tags: ['iron-rich', 'protein', 'filling']
  },
  {
    id: 'snack-poha',
    name: 'Veg Poha',
    type: 'snack',
    cuisine: 'indian',
    nutrition: { calories: 180, protein: '3g', fat: '5g', carbs: '30g' },
    prepTime: 'Prep: 5m | Cook: 10m',
    videoUrl: 'https://www.youtube.com/results?search_query=Kids+Poha+Recipe',
    ingredients: ['1 cup Poha (Flattened rice)', 'Onion', 'Potato', 'Peanuts', 'Turmeric'],
    instructions: [
      '1. Rinse poha and drain.',
      '2. Fry peanuts, onion, and potato cubes.',
      '3. Add turmeric and poha.',
      '4. Steam for 2 mins covered.',
      '5. Add lemon and coriander.'
    ],
    tags: ['light', 'breakfast-snack']
  },
  {
    id: 'snack-millet-cookies',
    name: 'Ragi/Millet Cookies',
    type: 'snack',
    cuisine: 'baked',
    nutrition: { calories: 150, protein: '2g', fat: '7g', carbs: '18g' },
    prepTime: 'Prep: 10m | Cook: 15m',
    videoUrl: 'https://www.youtube.com/results?search_query=Ragi+Cookies+Recipe+Healthy',
    ingredients: ['Ragi Flour', 'Wheat Flour', 'Jaggery', 'Butter', 'Cardamom'],
    instructions: [
      '1. Cream butter and jaggery powder.',
      '2. Add flours and cardamom.',
      '3. Form dough (add milk if needed).',
      '4. Shape into flat cookies.',
      '5. Bake at 180°C for 15 mins.',
      '6. Store in jar.'
    ],
    tags: ['baked', 'sweet', 'calcium']
  },
  {
    id: 'snack-dry-fruits',
    name: 'Dry Fruits & Nuts Mix',
    type: 'snack',
    cuisine: 'raw',
    nutrition: { calories: 200, protein: '5g', fat: '15g', carbs: '10g' },
    prepTime: 'Prep: 2m | Cook: 0m',
    videoUrl: 'https://www.youtube.com/results?search_query=Healthy+Nut+Mix+for+Kids',
    ingredients: ['Almonds (soaked/plain)', 'Cashews', 'Walnuts', 'Raisins', 'Dates'],
    instructions: [
      '1. Create a mix of favorite nuts.',
      '2. Dates add natural sweetness.',
      '3. Ensure nuts are bite-sized (unsafe for very small toddlers, okay for 6yo).',
      '4. Option: Lightly roast almonds/cashews for crunch.',
      '5. Pack a small handful portion (approx 30g) as nuts are calorie-dense.'
    ],
    tags: ['energy', 'brain-food', 'omega-3']
  },
  {
    id: 'snack-butter-corn',
    name: 'Butter Sweet Corn',
    type: 'snack',
    cuisine: 'general',
    nutrition: { calories: 130, protein: '4g', fat: '5g', carbs: '25g' },
    prepTime: 'Prep: 2m | Cook: 10m',
    videoUrl: 'https://www.youtube.com/results?search_query=Butter+Sweet+Corn+Recipe+Cup+Corn',
    ingredients: ['1 cup Sweet Corn Kernels (Frozen or Fresh)', '1 tbsp Butter', 'Salt', 'Pinch of Pepper'],
    instructions: [
      '1. Steam corn kernels for 10 mins until tender.',
      '2. Drain excess water.',
      '3. Immediately toss with butter, salt, and pepper while hot.',
      '4. Butter melts and coats the corn.',
      '5. Pack in a thermal container to keep warm.'
    ],
    tags: ['kids-favorite', 'easy', 'fiber']
  },
  {
    id: 'snack-corn-chat',
    name: 'Masala Corn Chat',
    type: 'snack',
    cuisine: 'general',
    nutrition: { calories: 140, protein: '4g', fat: '4g', carbs: '28g' },
    prepTime: 'Prep: 5m | Cook: 10m',
    videoUrl: 'https://www.youtube.com/results?search_query=Sweet+Corn+Chaat+Recipe+Indian',
    ingredients: ['1 cup Sweet Corn (boiled)', '1 tbsp Butter/Ghee', '1/4 tsp Chat Masala', '1/4 tsp Cumin powder', 'Lemon juice', 'Chopped Coriander'],
    instructions: [
      '1. Boil sweet corn until soft.',
      '2. Sauté corn in butter for 1-2 mins to remove moisture.',
      '3. Add chat masala, cumin powder, and salt.',
      '4. Turn off heat. Squeeze lemon juice and add fresh coriander.',
      '5. Tangy and tasty snack.'
    ],
    tags: ['tangy', 'healthy', 'chat']
  },
  /* --- NEW ADDITIONS (Kerala, TN, North Indian, Continental) --- */
  {
    id: 'lunch-tomato-rice',
    name: 'TN Tomato Rice (Thakkali Sadam)',
    type: 'lunch',
    cuisine: 'south-indian',
    nutrition: { calories: 290, protein: '4g', fat: '9g', carbs: '45g' },
    prepTime: 'Prep: 10m | Cook: 15m',
    videoUrl: 'https://www.youtube.com/results?search_query=Tomato+Rice+Recipe+Tamil+Nadu+Style',
    ingredients: ['1 cup Rice (cooked)', '2 Tomatoes (ripe)', 'Onion', 'Ginger Garlic Paste', 'Fennel Seeds', 'Mint Leaves'],
    instructions: [
      '1. Heat oil, splutter fennel seeds.',
      '2. Sauté onions and ginger-garlic paste.',
      '3. Add chopped tomatoes and cook till mushy.',
      '4. Add turmeric, chili powder, and mint leaves.',
      '5. Mix with cooked rice. Tastes better after a few hours!',
      '6. Pack with potato chips or fry.'
    ],
    tags: ['tangy', 'traditional', 'lunchbox-favorite']
  },
  {
    id: 'lunch-aloo-paratha',
    name: 'Aloo Paratha',
    type: 'lunch',
    cuisine: 'north-indian',
    nutrition: { calories: 350, protein: '8g', fat: '12g', carbs: '50g' },
    prepTime: 'Prep: 20m | Cook: 15m',
    videoUrl: 'https://www.youtube.com/results?search_query=Aloo+Paratha+Kids+Recipe',
    ingredients: ['Wheat Dough', '2 Potatoes (boiled & mashed)', 'Cumin Powder', 'Coriander', 'Amchur (Mango Powder)', 'Butter'],
    instructions: [
      '1. Mash potatoes well with spices (no lumps).',
      '2. Stuff into dough ball and roll gently.',
      '3. Cook on tawa with generous ghee/butter.',
      '4. Serve with curd or pickle.',
      '5. Stays soft for lunch.'
    ],
    tags: ['stuffed', 'filling', 'kids-love-it']
  },
  {
    id: 'lunch-veg-pasta',
    name: 'Creamy Veg Pasta',
    type: 'lunch',
    cuisine: 'continental',
    nutrition: { calories: 310, protein: '10g', fat: '10g', carbs: '45g' },
    prepTime: 'Prep: 10m | Cook: 15m',
    videoUrl: 'https://www.youtube.com/results?search_query=White+Sauce+Pasta+for+Kids+Indian+Style',
    ingredients: ['1 cup Penne Pasta', 'Milk', 'Butter', 'Flour (Maida/Wheat)', 'Sweet Corn', 'Carrot', 'Cheese'],
    instructions: [
      '1. Boil pasta al dente.',
      '2. Make white sauce: Sauté flour in butter, slowly add milk.',
      '3. Add boiled colorful veggies (corn, carrot, peas).',
      '4. Toss pasta in sauce. Season with oregano/herbs.',
      '5. Pack immediately. Add little extra milk to keep moist.'
    ],
    tags: ['creamy', 'western', 'veggies-hidden']
  },
  {
    id: 'lunch-coconut-rice',
    name: 'Coconut Rice (Thengai Sadam)',
    type: 'lunch',
    cuisine: 'south-indian',
    nutrition: { calories: 320, protein: '5g', fat: '15g', carbs: '42g' },
    prepTime: 'Prep: 15m | Cook: 10m',
    videoUrl: 'https://www.youtube.com/results?search_query=Coconut+Rice+Recipe+South+Indian',
    ingredients: ['1 cup Rice (cooked)', '1/2 cup Fresh Coconut (grated)', 'Urad Dal', 'Cashews', 'Curry Leaves', 'Coconut Oil'],
    instructions: [
      '1. Heat coconut oil. Splutter mustard, urad dal, cashews.',
      '2. Add curry leaves and red chilies.',
      '3. Add grated coconut and sauté for 1 min (don\'t brown).',
      '4. Mix with cooked rice and salt.',
      '5. Very mild and aromatic.'
    ],
    tags: ['mild', 'coconut', 'quick']
  },
  {
    id: 'lunch-rajma-chawal',
    name: 'Mini Rajma Chawal',
    type: 'lunch',
    cuisine: 'north-indian',
    nutrition: { calories: 300, protein: '12g', fat: '6g', carbs: '50g' },
    prepTime: 'Prep: Soak 8hr | Cook: 30m',
    videoUrl: 'https://www.youtube.com/results?search_query=Rajma+Chawal+Lunchbox+Recipe',
    ingredients: ['Rajma (Red Kidney Beans)', 'Rice', 'Onion', 'Tomato puree', 'Rajma Masala'],
    instructions: [
      '1. Pressure cook soaked rajma till soft.',
      '2. Prepare onion-tomato gravy with spices.',
      '3. Mix rajma into gravy and simmer.',
      '4. Mix with rice ("Bisi Bele" consistency) or pack separately.',
      '5. High protein favorite.'
    ],
    tags: ['protein-power', 'classic', 'filling']
  },
  {
    id: 'snack-banana-roast',
    name: 'Banana Ghee Roast',
    type: 'snack',
    cuisine: 'kerala',
    nutrition: { calories: 180, protein: '1g', fat: '8g', carbs: '30g' },
    prepTime: 'Prep: 2m | Cook: 5m',
    videoUrl: 'https://www.youtube.com/results?search_query=Banana+Ghee+Roast+for+Kids',
    ingredients: ['1 Nendran Banana (Ripe)', '1 tbsp Ghee', 'Sugar/Jaggery (optional)'],
    instructions: [
      '1. Cut banana into round slices.',
      '2. Heat ghee in a pan.',
      '3. Roast slices until golden brown on both sides.',
      '4. Sprinkle very little sugar for caramelization if liked.',
      '5. Best energy booster.'
    ],
    tags: ['sweet', 'fruit', 'kerala-special']
  },
  {
    id: 'snack-cheese-sandwich',
    name: 'Veg Cheese Sandwich',
    type: 'snack',
    cuisine: 'continental',
    nutrition: { calories: 200, protein: '8g', fat: '10g', carbs: '25g' },
    prepTime: 'Prep: 5m | Cook: 5m',
    videoUrl: 'https://www.youtube.com/results?search_query=Veg+Cheese+Sandwich+for+School',
    ingredients: ['2 Bread Slices', 'Cheese Slice', 'Cucumber', 'Tomato', 'Butter', 'Pepper'],
    instructions: [
      '1. Butter the bread slices.',
      '2. Place cucumber and tomato slices.',
      '3. Add a cheese slice and sprinkle pepper.',
      '4. Grill or toast on tawa until cheese melts.',
      '5. Cut into 4 small triangles for easy handling.'
    ],
    tags: ['easy', 'calcium', 'kids-favorite']
  },
  {
    id: 'snack-unniyappam',
    name: 'Unniyappam (Sweet Rice Balls)',
    type: 'snack',
    cuisine: 'kerala',
    nutrition: { calories: 60, protein: '1g', fat: '2g', carbs: '10g' },
    prepTime: 'Prep: Batter | Cook: 20m',
    videoUrl: 'https://www.youtube.com/results?search_query=Instant+Unniyappam+Recipe',
    ingredients: ['Rice Flour', 'Jaggery', 'Banana (mashed)', 'Cardamom', 'Coconut bits'],
    instructions: [
      '1. Make batter with rice flour, jaggery syrup, and mashed banana.',
      '2. Add fried coconut bits and cardamom.',
      '3. Cook in "Appam Patra" (mould pan) with ghee/oil.',
      '4. Pack 3-4 unniyappams.',
      '5. Traditional healthy sweet snack.'
    ],
    tags: ['sweet', 'traditional', 'festive']
  }
];
