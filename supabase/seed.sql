-- Seeds roadmap_tasks from lib/roadmap-data.ts. Run once after schema.sql.
-- If the roadmap content ever changes, update both files together.

insert into public.roadmap_tasks (id, week_number, title, sort_order, points) values
  ('w1-t1', 1, 'Analyse 8–10 products across industries', 1, 10),
  ('w1-t2', 1, 'Spend time exploring one key flow in each product', 2, 10),
  ('w1-t3', 1, 'Compare at least 2 competing products', 3, 10),
  ('w1-t4', 1, 'Capture learnings in a simple product teardown note', 4, 10),
  ('w1-t5', 1, 'Build your Feature Bank (features you observed)', 5, 10),
  ('w1-t6', 1, 'Build your Journey Bank (user flows and touchpoints)', 6, 10),
  ('w1-t7', 1, 'Build your Metric Bank (important metrics to track)', 7, 10),

  ('w2-t1', 2, 'Practise 10–15 product design cases', 1, 10),
  ('w2-t2', 2, 'Use a simple structure in every answer', 2, 10),
  ('w2-t3', 2, 'Spend time improving both new and existing products', 3, 10),
  ('w2-t4', 2, 'Review your answers and refine your thinking', 4, 10),

  ('w3-t1', 3, 'Practise 8–10 RCA cases', 1, 10),
  ('w3-t2', 3, 'Learn metrics for ~10 popular products', 2, 10),
  ('w3-t3', 3, 'Use a simple structure in every answer', 3, 10),
  ('w3-t4', 3, 'Review your logic and refine your thinking', 4, 10),

  ('w4-t1', 4, 'Practice 10–15 GTM cases across industries', 1, 10),
  ('w4-t2', 4, 'Solve 5–10 prioritisation cases (feature, product or investment)', 2, 10),
  ('w4-t3', 4, 'Use frameworks like RICE, ICE, MoSCoW', 3, 10),
  ('w4-t4', 4, 'Consider execution, risks and constraints', 4, 10),
  ('w4-t5', 4, 'Review answers and get feedback', 5, 10),

  ('w5-t1', 5, 'Practice 15–20 guesstimates across different industries', 1, 10),
  ('w5-t2', 5, 'Build your behavioural story bank (15+ stories)', 2, 10),
  ('w5-t3', 5, 'Pick 2–3 favourite products and prepare deep dives', 3, 10),
  ('w5-t4', 5, 'Do mock interviews with peers or mentors', 4, 10),
  ('w5-t5', 5, 'Review feedback and refine your answers', 5, 10),

  ('w6-t1', 6, 'Take 4–6 full-length mocks', 1, 10),
  ('w6-t2', 6, 'Prepare company-wise (product, strategy, recent news, metrics, case studies)', 2, 10),
  ('w6-t3', 6, 'Get feedback from peers, alums or mentors', 3, 10),
  ('w6-t4', 6, 'Build a repository of your best examples and frameworks', 4, 10),
  ('w6-t5', 6, 'Do timed practice and refine your communication', 5, 10)
on conflict (id) do update set
  week_number = excluded.week_number,
  title = excluded.title,
  sort_order = excluded.sort_order,
  points = excluded.points;
