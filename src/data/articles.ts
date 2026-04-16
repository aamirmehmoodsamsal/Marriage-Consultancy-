export const categoriesList = [
  "Parenting", 
  "Relationships", 
  "Pre-Marital", 
  "Spirituality", 
  "Mental Health",
  "Youth & Teens",
  "Islamic Finance",
  "Community",
  "Self-Development",
  "Marriage"
];

export const articles = [
  {
    category: "Parenting",
    title: "Prophetic Methods of Disciplining Children",
    readTime: "5 min read",
    excerpt: "Discover how the Prophet ﷺ balanced immense love with clear boundaries when raising the youth.",
    content: `
      <p>Raising children in the modern era often feels like navigating a minefield of conflicting advice. However, the Seerah (life of the Prophet ﷺ) provides a timeless, balanced approach to Tarbiyah (nurturing and upbringing).</p>
      <br/>
      <h4 class="font-serif text-xl mb-2">1. Leading by Example (Qudwah)</h4>
      <p>Before issuing commands, the Prophet ﷺ embodied the behavior he wished to see. Children are astute observers. If we want them to pray, they must see us praying with devotion. If we want them to be truthful, we must never lie to them, even in jest.</p>
      <br/>
      <h4 class="font-serif text-xl mb-2">2. Immense Affection</h4>
      <p>The Prophet ﷺ was not afraid to show physical affection. He would kiss his grandsons, Hasan and Husain. When a Bedouin remarked that he had ten children and never kissed any of them, the Prophet ﷺ replied, "Whoever does not show mercy will not be shown mercy." (Bukhari)</p>
      <br/>
      <h4 class="font-serif text-xl mb-2">3. Gentle Correction</h4>
      <p>When a young boy, Umar ibn Abi Salama, was eating from all sides of the dish, the Prophet ﷺ didn't scold him harshly. Instead, he gently guided him: "O boy, mention the Name of Allah, eat with your right hand, and eat from what is near to you." (Bukhari)</p>
      <br/>
      <p>True discipline in Islam is not about punishment; it is about teaching, guiding, and nurturing the fitrah (pure innate nature) of the child.</p>
    `
  },
  {
    category: "Relationships",
    title: "Understanding Your Spouse's Love Language in Islam",
    readTime: "8 min read",
    excerpt: "Learn how recognizing and speaking your spouse's unique love language aligns with the Islamic principle of Rahmah.",
    content: `
      <p>Allah says in the Quran that He placed "Mawaddah" (deep affection) and "Rahmah" (mercy) between spouses. But how do we practically express this affection? Often, couples struggle because they are speaking different "love languages."</p>
      <br/>
      <h4 class="font-serif text-xl mb-2">Acts of Service</h4>
      <p>Aisha (RA) was asked what the Prophet ﷺ used to do in his house. She replied, "He used to keep himself busy serving his family..." (Bukhari). Helping with chores is a profound Sunnah and a powerful way to show love.</p>
      <br/>
      <h4 class="font-serif text-xl mb-2">Words of Affirmation</h4>
      <p>The Prophet ﷺ frequently expressed his love for his wives verbally. When asked who he loved most among the people, he openly declared, "Aisha." Speaking kind, affirming words is a charity in Islam.</p>
      <br/>
      <h4 class="font-serif text-xl mb-2">Quality Time</h4>
      <p>Despite carrying the weight of the Ummah, the Prophet ﷺ made time to race with Aisha (RA) and listen to her stories. Giving your spouse undivided attention is a crucial aspect of fulfilling their rights.</p>
      <br/>
      <p>By understanding how your spouse receives love, you can fulfill the Quranic mandate of being a source of tranquility (Sakinah) for one another.</p>
    `
  },
  {
    category: "Pre-Marital",
    title: "Questions to Ask Before Saying 'Qabool Hai'",
    readTime: "10 min read",
    excerpt: "A comprehensive guide to the essential conversations every couple must have before committing to marriage.",
    content: `
      <p>Marriage is half of faith, yet many enter it based solely on superficial compatibility. To build a resilient, God-conscious home, potential spouses must have deep, sometimes uncomfortable, conversations before the Nikah.</p>
      <br/>
      <h4 class="font-serif text-xl mb-2">1. Religious Expectations</h4>
      <p>Don't just ask, "Do you pray?" Ask about their relationship with the Quran, their understanding of gender roles in Islam, and how they plan to implement the Sunnah in their daily lives. Are your spiritual goals aligned?</p>
      <br/>
      <h4 class="font-serif text-xl mb-2">2. Financial Philosophy</h4>
      <p>Finances are a leading cause of marital stress. Discuss expectations regarding the wife working, how bills will be split (or not, based on Islamic rights), debt, and financial goals. Clarity here prevents resentment later.</p>
      <br/>
      <h4 class="font-serif text-xl mb-2">3. Conflict Resolution</h4>
      <p>How do they handle anger? Do they need space, or do they want to talk it out immediately? Understanding each other's conflict styles is crucial for navigating the inevitable disagreements of married life.</p>
      <br/>
      <p>Remember, the goal of the talking phase is not to impress, but to assess. Be honest, be thorough, and rely on Istikhara.</p>
    `
  }
];

const templates = [
  "The Importance of Sabr in {topic}",
  "Navigating {topic} in the Modern World",
  "A Sunnah Approach to {topic}",
  "Understanding {topic} through the Quran",
  "Practical Tips for {topic}",
  "Finding Peace in {topic}",
  "The Role of Dua in {topic}",
  "Building Resilience: {topic}",
  "Islamic Perspectives on {topic}",
  "Overcoming Challenges in {topic}"
];
const topics = [
  "Family Life", 
  "Marriage", 
  "Raising Children", 
  "Personal Growth", 
  "Emotional Well-being", 
  "Daily Life", 
  "Community Building", 
  "Spiritual Growth",
  "Conflict Resolution",
  "Financial Harmony",
  "Youth Empowerment",
  "Mental Clarity",
  "Work-Life Balance"
];

// Generate the remaining articles to reach exactly 200
for (let i = 4; i <= 200; i++) {
  const category = categoriesList[i % categoriesList.length];
  const topic = topics[i % topics.length];
  const template = templates[i % templates.length];
  const title = template.replace("{topic}", topic) + (i > 50 ? ` (Part ${Math.floor(i/20) + 1})` : '');

  articles.push({
    category,
    title,
    readTime: `${(i % 8) + 3} min read`,
    excerpt: `An insightful exploration into ${topic.toLowerCase()} and how we can apply Islamic principles to improve our daily lives and relationships.`,
    content: `
      <p>This is a comprehensive guide about <strong>${topic}</strong>. In the context of ${category.toLowerCase()}, it is essential to look back at the teachings of the Quran and Sunnah to find our grounding.</p>
      <br/>
      <h4 class="font-serif text-xl mb-2">Understanding the Basics</h4>
      <p>When we approach the topic of ${topic.toLowerCase()}, we must first ground ourselves in Sabr (patience) and Shukr (gratitude). The modern world presents unique challenges, but the prophetic model remains timeless and applicable to all generations.</p>
      <br/>
      <h4 class="font-serif text-xl mb-2">Practical Steps for the Modern Muslim</h4>
      <p>1. <strong>Make sincere Dua:</strong> Never underestimate the power of supplication in resolving matters of the heart and home.</p>
      <p>2. <strong>Seek beneficial knowledge:</strong> Equip yourself with the understanding of your Deen.</p>
      <p>3. <strong>Consult with people of wisdom (Shura):</strong> Seek advice from qualified scholars and experienced elders.</p>
      <br/>
      <p>May Allah grant us all tawfiq (success) in our journey towards bettering ourselves and our families.</p>
    `
  });
}
