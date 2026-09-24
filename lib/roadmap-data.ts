/**
 * Static content for the BTC Product Management Placement Prep Roadmap.
 * Sourced from the "BTC PM Prep Roadmap" deck. This file is the single
 * source of truth for both the UI and supabase/seed.sql — task ids here
 * must match the ids seeded into `roadmap_tasks` in that file.
 */

export type ColorSlot = 1 | 2 | 3 | 4 | 5 | 6;

export interface RoadmapTask {
  id: string;
  title: string;
  points: number;
}

export interface ApproachStep {
  label: string;
  detail: string;
}

export interface Week {
  id: string;
  weekNumber: number;
  emoji: string;
  title: string;
  subtitle: string;
  hours: string;
  colorSlot: ColorSlot;
  whatThisMeans: string[];
  tasks: RoadmapTask[];
  approach: ApproachStep[];
  outputExpected: string[];
  footerTags: string[];
  /** Week 1 only: the "suggested industries & products" reference table. */
  suggestedIndustries?: { industry: string; products: string }[];
  /** Week 1 only: the worked Swiggy-flow example, step by step. */
  workedExample?: { step: string; questions: string[] }[];
}

export const weeks: Week[] = [
  {
    id: "w1",
    weekNumber: 1,
    emoji: "💡",
    title: "Build Product Sense",
    subtitle:
      "Start seeing products like a PM by analysing how real products solve user problems.",
    hours: "~20 hours · 8–10 products",
    colorSlot: 1,
    whatThisMeans: [
      "Understand the user journey end to end",
      "Spot key features and decision points",
      "Notice metrics, trade-offs and business goals",
      "Compare how similar products solve the same problem",
    ],
    tasks: [
      { id: "w1-t1", title: "Analyse 8–10 products across industries", points: 10 },
      { id: "w1-t2", title: "Spend time exploring one key flow in each product", points: 10 },
      { id: "w1-t3", title: "Compare at least 2 competing products", points: 10 },
      { id: "w1-t4", title: "Capture learnings in a simple product teardown note", points: 10 },
      { id: "w1-t5", title: "Build your Feature Bank (features you observed)", points: 10 },
      { id: "w1-t6", title: "Build your Journey Bank (user flows and touchpoints)", points: 10 },
      { id: "w1-t7", title: "Build your Metric Bank (important metrics to track)", points: 10 },
    ],
    approach: [],
    outputExpected: [
      "Feature Bank — features you observed",
      "Journey Bank — user flows and touchpoints",
      "Metric Bank — important metrics to track",
    ],
    footerTags: ["Observe products", "Compare journeys", "Build your bank"],
    suggestedIndustries: [
      { industry: "Food Delivery", products: "Swiggy, Zomato" },
      { industry: "Quick Commerce", products: "Zepto, Blinkit" },
      { industry: "E-commerce", products: "Amazon, Flipkart" },
      { industry: "Travel", products: "MakeMyTrip, Goibibo" },
      { industry: "Mobility", products: "Uber, Rapido" },
      { industry: "Payments", products: "PhonePe, Google Pay" },
      { industry: "AI Products", products: "Claude, ChatGPT, Gemini" },
      { industry: "Music Streaming", products: "Spotify, Apple Music" },
    ],
    workedExample: [
      {
        step: "1. Discovery",
        questions: ["Home screen, categories, banners", "How do users discover restaurants?", "What drives clicks and engagement?"],
      },
      {
        step: "2. Search & Listing",
        questions: ["Search results and restaurant cards", "How are results ranked?", "What information helps users choose?"],
      },
      {
        step: "3. Menu",
        questions: ["Dish list, images, ratings, reviews", "How is the menu structured?", "What drives dish selection?"],
      },
      {
        step: "4. Cart",
        questions: ["Selected items, quantities, add-ons", "What friction exists before checkout?", "How does cart design affect conversion?"],
      },
      {
        step: "5. Upsell & Discounts",
        questions: ["Cross-sell, add more, combo suggestions", "Item-level, first-order, and threshold discounts", "How do these increase AOV and conversion?"],
      },
      {
        step: "6. Payment",
        questions: ["UPI, cards, wallet, BNPL", "Why offer multiple payment options?", "How do payments reduce drop-offs?"],
      },
      {
        step: "7. Post-Order",
        questions: ["Tracking, cancellation, refund, support", "How is trust built after payment?", "What happens if something goes wrong?"],
      },
    ],
  },
  {
    id: "w2",
    weekNumber: 2,
    emoji: "✏️",
    title: "Product Design",
    subtitle:
      "Learn to solve product design questions with structured thinking, clear user focus and practical trade-offs.",
    hours: "~10 hours · 10–15 cases",
    colorSlot: 2,
    whatThisMeans: [
      "Understand the user before jumping to solutions",
      "Define the problem clearly and prioritise one need",
      "Generate thoughtful solutions, not random features",
      "Explain trade-offs and success metrics",
    ],
    tasks: [
      { id: "w2-t1", title: "Practise 10–15 product design cases", points: 10 },
      { id: "w2-t2", title: "Use a simple structure in every answer", points: 10 },
      { id: "w2-t3", title: "Spend time improving both new and existing products", points: 10 },
      { id: "w2-t4", title: "Review your answers and refine your thinking", points: 10 },
    ],
    approach: [
      { label: "1. Clarify", detail: "Who is the user? What problem are we solving?" },
      { label: "2. Target User", detail: "Choose a segment and understand their needs" },
      { label: "3. Prioritise", detail: "Pick the most important pain point" },
      { label: "4. Solution", detail: "Propose features and explain why" },
      { label: "5. Success Metrics", detail: "Define how you would measure impact" },
    ],
    outputExpected: [
      "Structured answers, not scattered ideas",
      "Better comfort with ambiguity",
      "A repeatable framework for interviews",
    ],
    footerTags: ["Clarify the problem", "Design with users in mind", "Show trade-offs clearly"],
  },
  {
    id: "w3",
    weekNumber: 3,
    emoji: "📊",
    title: "RCA & Metrics",
    subtitle:
      "Learn to break down problems systematically, identify root causes and build comfort with key product metrics.",
    hours: "~15 hours · 8–10 cases",
    colorSlot: 3,
    whatThisMeans: [
      "Break a problem down before jumping to solutions",
      "Separate symptoms from root causes",
      "Use data, funnels and segmentation to form hypotheses",
      "Understand which product metrics matter and why",
    ],
    tasks: [
      { id: "w3-t1", title: "Practise 8–10 RCA cases", points: 10 },
      { id: "w3-t2", title: "Learn metrics for ~10 popular products", points: 10 },
      { id: "w3-t3", title: "Use a simple structure in every answer", points: 10 },
      { id: "w3-t4", title: "Review your logic and refine your thinking", points: 10 },
    ],
    approach: [
      { label: "1. Clarify", detail: "What exactly is the problem?" },
      { label: "2. Segment", detail: "Which user, city, platform or funnel stage" },
      { label: "3. Diagnose", detail: "Break down metrics and find likely drivers" },
      { label: "4. Hypothesise", detail: "List possible causes and test them" },
      { label: "5. Recommend", detail: "Suggest next steps and what to track" },
    ],
    outputExpected: [
      "Structured answers, not scattered ideas",
      "Better comfort with data and metrics",
      "A repeatable framework for interviews",
    ],
    footerTags: ["Break the problem down", "Use metrics with purpose", "Think in hypotheses"],
  },
  {
    id: "w4",
    weekNumber: 4,
    emoji: "📣",
    title: "GTM & Prioritisation",
    subtitle:
      "Figure out how to take products to market and make smart trade-offs when resources are limited.",
    hours: "~18 hours · 15–20 cases",
    colorSlot: 4,
    whatThisMeans: [
      "Understand how products reach and grow with users",
      "Learn key GTM levers and frameworks",
      "Prioritise features or bets with structured thinking",
      "Make trade-offs considering user, business and technical constraints",
    ],
    tasks: [
      { id: "w4-t1", title: "Practice 10–15 GTM cases across industries", points: 10 },
      { id: "w4-t2", title: "Solve 5–10 prioritisation cases (feature, product or investment)", points: 10 },
      { id: "w4-t3", title: "Use frameworks like RICE, ICE, MoSCoW", points: 10 },
      { id: "w4-t4", title: "Consider execution, risks and constraints", points: 10 },
      { id: "w4-t5", title: "Review answers and get feedback", points: 10 },
    ],
    approach: [
      { label: "1. Understand", detail: "Clarify the goal, context and key constraints" },
      { label: "2. Structure", detail: "Break down the problem using GTM levers or a prioritisation framework" },
      { label: "3. Analyse", detail: "Evaluate options using data, assumptions and frameworks" },
      { label: "4. Recommend", detail: "Make a clear and actionable recommendation" },
      { label: "5. Discuss", detail: "Explain trade-offs, risks and next steps" },
    ],
    outputExpected: [
      "Structured and logical answers",
      "Clear recommendations with reasoning",
      "Stronger business judgment and trade-off thinking",
    ],
    footerTags: ["Think end-to-end", "Use frameworks, not just instinct", "Be ready to defend your trade-offs"],
  },
  {
    id: "w5",
    weekNumber: 5,
    emoji: "🎯",
    title: "Guesstimates, Behavioural & Favourite Product",
    subtitle:
      "Tackle estimation questions, build your story bank and deep dive into 2–3 products you know well.",
    hours: "~20 hours · 15–20 guesstimates",
    colorSlot: 5,
    whatThisMeans: [
      "Learn to approach estimation questions with a structured mindset",
      "Prepare for behavioural questions using real experiences and the STAR method",
      "Deep dive into 2–3 products you know well",
      "Articulate product decisions, metrics and impact clearly and confidently",
    ],
    tasks: [
      { id: "w5-t1", title: "Practice 15–20 guesstimates across different industries", points: 10 },
      { id: "w5-t2", title: "Build your behavioural story bank (15+ stories)", points: 10 },
      { id: "w5-t3", title: "Pick 2–3 favourite products and prepare deep dives", points: 10 },
      { id: "w5-t4", title: "Do mock interviews with peers or mentors", points: 10 },
      { id: "w5-t5", title: "Review feedback and refine your answers", points: 10 },
    ],
    approach: [
      { label: "1. Understand", detail: "Clarify the question and what needs to be estimated or discussed" },
      { label: "2. Structure", detail: "Lay out a framework, e.g. top down or bottom up" },
      { label: "3. Estimate / Analyse", detail: "Use logical assumptions and sanity checks" },
      { label: "4. Conclude", detail: "Arrive at a reasonable answer and discuss implications" },
      { label: "5. Communicate", detail: "Be clear, structured and confident in your delivery" },
    ],
    outputExpected: [
      "Structured and logical answers",
      "Strong and authentic behavioural stories",
      "Clear product deep dives with insights and recommendations",
    ],
    footerTags: ["Practice with real-world examples", "Refine your stories and frameworks", "Build confidence through mocks"],
  },
  {
    id: "w6",
    weekNumber: 6,
    emoji: "🏁",
    title: "Mocks & Company Prep",
    subtitle:
      "Bring it all together, practice in a realistic setting and get company-ready.",
    hours: "~10+ hours · mocks + company deep dives",
    colorSlot: 6,
    whatThisMeans: [
      "Simulate real interview conditions",
      "Get comfortable with different formats (product sense, design, RCA, metrics, behavioural)",
      "Understand company-specific expectations",
      "Identify gaps and work on your weak areas",
    ],
    tasks: [
      { id: "w6-t1", title: "Take 4–6 full-length mocks", points: 10 },
      { id: "w6-t2", title: "Prepare company-wise (product, strategy, recent news, metrics, case studies)", points: 10 },
      { id: "w6-t3", title: "Get feedback from peers, alums or mentors", points: 10 },
      { id: "w6-t4", title: "Build a repository of your best examples and frameworks", points: 10 },
      { id: "w6-t5", title: "Do timed practice and refine your communication", points: 10 },
    ],
    approach: [
      { label: "1. Understand", detail: "Clarify the question and expectations" },
      { label: "2. Structure", detail: "Lay out your approach before diving in" },
      { label: "3. Solve", detail: "Walk through your thinking step by step" },
      { label: "4. Communicate", detail: "Be clear, concise and engage with the interviewer" },
      { label: "5. Reflect", detail: "Take feedback and note areas to improve" },
    ],
    outputExpected: [
      "Comfortable with end-to-end interview flow",
      "Well prepared for your target companies",
      "Clearer articulation and stronger confidence",
    ],
    footerTags: ["Practice like it's the real thing", "Learn from feedback, improve iteratively", "Be interview ready and confident"],
  },
];

export const allTasks: RoadmapTask[] = weeks.flatMap((w) => w.tasks);
export const totalPoints = allTasks.reduce((sum, t) => sum + t.points, 0);

export function taskWeek(taskId: string): Week | undefined {
  return weeks.find((w) => w.tasks.some((t) => t.id === taskId));
}
