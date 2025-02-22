export interface Feature {
  title: string;
  icon: string;
  description: string;
}

export interface KeyFeature {
  title: string;
  icon: string;
  description: string;
}

export const presentationContent = {
  // Slide 1: Welcome
  welcome: {
    title: "Deep Research",
    subtitle: "Revolutionizing academic research with AI-powered insights",
    // Add any additional welcome slide content
  },

  // Slide 2: Problem Statement
  problem: {
    title: "The Challenge",
    points: [
      "Time-consuming and repetitive research processes",
      "Limited by human processing capacity",
      "Prone to missing crucial connections",
      "Difficult to scale effectively",
      // Add more pain points
    ],
  },

  // Slide 3: Our Solution
  solution: {
    title: "Our Solution",
    features: [
      {
        title: "AI-Powered Analysis",
        icon: "🤖",
        description: "Advanced machine learning algorithms process vast amounts of research data"
      },
      {
        title: "Smart Connections",
        icon: "🔗",
        description: "Automatically identify relationships between different research papers"
      },
      {
        title: "Real-time Updates",
        icon: "⚡",
        description: "Stay current with the latest research in your field"
      },
      // Add more features
    ] as Feature[],
  },

  // Slide 4: Key Features
  features: {
    title: "Key Features",
    subtitle: "Transforming research workflows",
    leftColumn: [
      {
        title: "Data Analysis",
        icon: "📊",
        description: "Process and analyze research papers at scale"
      },
      {
        title: "Citation Tracking",
        icon: "🎯",
        description: "Track and manage citations automatically"
      },
      // Add more left column features
    ] as KeyFeature[],
    rightColumn: [
      {
        title: "Integration",
        icon: "🔄",
        description: "Seamless integration with existing tools"
      },
      {
        title: "Accessibility",
        icon: "📱",
        description: "Access your research from anywhere"
      },
      // Add more right column features
    ] as KeyFeature[],
  },

  // Slide 5: Call to Action
  cta: {
    title: "Ready to Transform Your Research?",
    subtitle: "Join thousands of researchers who are already using Deep Research",
    primaryButton: {
      text: "Get Started",
      action: "/signup" // or any other action
    },
    secondaryButton: {
      text: "Learn More",
      action: "/about" // or any other action
    },
  },

  // Add more slides as needed
}; 